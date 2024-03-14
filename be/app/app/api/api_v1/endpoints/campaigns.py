from typing import Any, List
from fastapi import APIRouter, Depends
from app.schemas.campaigns import CampaignsInDB, CampaignsCreate, Campaigns, CampaignsUpdate
from app.api import deps
from sqlalchemy.orm import Session
from app.services.campaigns_service import campaigns_service
from fastapi import Body

router = APIRouter()

swagger_data = {
    "campaign": Body(
        example={
            "name": "test",
        }),
}

@router.get('/', status_code=200, response_model=List[CampaignsInDB])
def fetch_all(*, db: Session = Depends(deps.get_db)) -> Any:
    """
    Fetch all campaigns info
    """
    return campaigns_service.get_all(db)

@router.get('/{campaign_id}', status_code=200)
def get_by_id(*, campaign_id: int, db: Session = Depends(deps.get_db)):
    """
    Get campaign by ID
    """
    return campaigns_service.get_by_id(db, campaign_id)

@router.get('/active/ranking', status_code=200)
def fetch_ranking(*, db: Session = Depends(deps.get_db)) -> Any:
    """
    Fetch all campaigns ranking
    """
    return campaigns_service.get_ranking(db)

@router.post('/', status_code=200, response_model=CampaignsInDB)
def create_campaign(*, campaign_in: CampaignsCreate = swagger_data["campaign"], db: Session = Depends(deps.get_db)) -> Any:
    """
    Create campaign
    """
    return campaigns_service.create(db, obj_in=campaign_in)

@router.put('/{campaign_id}', status_code=200)
def update_by_id(*, campaign_id: int, campaign: CampaignsUpdate, db: Session = Depends(deps.get_db)):
    """
    Update campaign by ID
    """
    return campaigns_service.update(db, campaign_id, campaign)

@router.delete('/{campaign_id}', status_code=200)
def delete_by_id(*, campaign_id: int, db: Session = Depends(deps.get_db)):
    """
    Delete campaign by ID
    """
    return campaigns_service.remove(db, campaign_id)