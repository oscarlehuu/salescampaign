from typing import List, Union, Dict, Any
from app.services.base import CRUDBase
from fastapi import HTTPException
from fastapi.responses import JSONResponse
from app.models.users import Users
from .CRM_PLATFORM_Client import CRM_PLATFORMAPI
from .campaigns_service import campaigns_service
from app.schemas.users import UsersRegister, UsersUpdate, UsersInDB
from sqlalchemy.orm import Session, joinedload
import datetime

class UsersService(CRUDBase[Users, UsersRegister, UsersUpdate]):

    def get_all(self, db: Session) -> List[UsersInDB]:
        return db.query(Users).all()
    
    def get_one(self, db: Session, crm_platform_account_id: str) -> UsersInDB:
        user = db.query(Users).options(joinedload(Users.role)).filter(Users.crm_platform_account_id == crm_platform_account_id).first()
        if user is None:
            raise ValueError(f"no user found with id {crm_platform_account_id} and {user}")
        return {
            'id': user.id,
            'full_name': user.full_name,
            'email': user.email,
            'crm_platform_account_id': user.crm_platform_account_id,
            'crm_platform_account_code': user.crm_platform_account_code,
            'created_date': user.created_date,
            'role': user.role.name
        }

    def get_new_endusers(self, db: Session, token):
        # 7 days ago
        # date = (datetime.datetime.today() - datetime.timedelta(days=7)).strftime("%Y-%m-%d")

        # active campaign start date
        start_date = campaigns_service.get_active_start_date(db)
        date = start_date.strftime("%Y-%m-%d")
        return CRM_PLATFORMAPI.getNewEnduser(date=date, token=token)
    
    def update(
        self, db: Session, id: int, obj_in: Union[UsersUpdate, Dict[str, Any]]
    ):
        return super().updateById(db, id=id, obj_in=obj_in)
    
    
    def remove(
        self, db: Session, id: int
    ):
        return super().remove(db, db_obj=Users, id=id )
    
    def remove_all(self, db: Session):
        try:
            db.query(Users).delete()
            db.commit()
        except Exception as e:
            raise HTTPException(status_code=500, detail=e)
        return JSONResponse(status_code=500, content="All users deleted successfully")

users_service = UsersService(Users)
