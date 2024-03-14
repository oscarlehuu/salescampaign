from typing import List, Optional, Union, Dict, Any
from app.services.base import CRUDBase
from fastapi import HTTPException, status
from app.models.users import Users
from app.schemas.users import UsersRegister, UsersUpdate, UsersLogin, UsersInDB
from .CRM_PLATFORM_Client import CRM_PLATFORM_Client
from .token_service import pwd_context
from sqlalchemy.orm import Session, joinedload
from .token_service import create_jwt_token

CRM_PLATFORMAPI = CRM_PLATFORM_Client()
class AuthService(CRUDBase[Users, UsersRegister, UsersUpdate]):
    def verify_password(plain_password: str, hashed_password: str):
        return pwd_context.verify(plain_password, hashed_password)
    
    def login(self, db: Session, *, obj_in: UsersLogin):
        user = db.query(Users).options(joinedload(Users.role)).filter(Users.email==obj_in.email, Users.crm_platform_account_code==obj_in.crm_platform_account_code).first()
        if user is None: 
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
        if not AuthService.verify_password(obj_in.password, user.password):
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Password incorrect")
        token = create_jwt_token({'crm_platform_account_id': user.crm_platform_account_id, 'role': user.role.name})
        return {"access_token": token, "token_type" : "Bearer"}

    def register(self, db: Session, *, obj_in: UsersRegister):
        db_obj = Users(**obj_in.dict())
        response = CRM_PLATFORMAPI.getReseller(db_obj.email, db_obj.crm_platform_account_code)
        if not response["status"]:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No Reseller found with this email and account code!.")
        user = db.query(Users).filter(Users.email==db_obj.email, Users.crm_platform_account_code==db_obj.crm_platform_account_code).first()            
        if user:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="User already existed!")
        db_obj.crm_platform_account_id = response["data"][0]["id"]
        db_obj.password = pwd_context.hash(db_obj.password)
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj


auth_service = AuthService(Users)
