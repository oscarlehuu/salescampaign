from typing import List, Optional, Union, Dict, Any
from app.services.base import CRUDBase
from app.models.campaigns import Campaigns
from fastapi import HTTPException
from app.schemas.campaigns import CampaignsCreate, CampaignsUpdate, CampaignsInDB
from sqlalchemy.orm import Session
from .CRM_PLATFORM_Client import CRM_PLATFORM_Client


CRM_PLATFORMAPI = CRM_PLATFORM_Client()
class CampaignsService(CRUDBase[Campaigns, CampaignsCreate, CampaignsUpdate]):

    def get_all(self, db: Session) -> List[CampaignsInDB]:
        return db.query(Campaigns).all()
    
    def get_all_active(self, db: Session):
        obj = db.query(Campaigns).filter(Campaigns.status == 'Active').all()
        if not obj:
            raise HTTPException(status_code=404, detail="Campaign not found")
        return obj  
    
    def get_one_active(self, db: Session):
        obj = db.query(Campaigns).filter(Campaigns.status == 'Active').first()
        if not obj:
            raise HTTPException(status_code=404, detail="Campaign not found")
        return obj  

    def get_active_start_date(self, db: Session):
        obj = db.query(Campaigns).filter(Campaigns.status == 'Active').first()
        if not obj:
            raise HTTPException(status_code=404, detail="Campaign not found")
        return obj.start_date
    
    def get_by_id(self, db: Session, campaign_id: int) -> CampaignsInDB:
        return super().get(db, campaign_id)    
    
    def create(self, db: Session, *, obj_in: CampaignsCreate) -> Campaigns:
        create_data = obj_in.dict()
        db_obj = Campaigns(**create_data)
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def update(
        self, db: Session, id: int, obj_in: Union[CampaignsUpdate, Dict[str, Any]]
    ):
        return super().updateById(db, id=id, obj_in=obj_in)
    
    def remove(
        self, db: Session, id: int
    ):
        return super().remove(db, db_obj=Campaigns, id=id )


campaigns_service = CampaignsService(Campaigns)
