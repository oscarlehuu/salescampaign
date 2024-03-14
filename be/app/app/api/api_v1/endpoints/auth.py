from typing import Any, List
from fastapi import APIRouter, Depends
from app.schemas.users import Users, UsersRegister, UsersLogin
from app.api import deps
from sqlalchemy.orm import Session
from app.services.auth_service import auth_service
from app.services.users_service import users_service
from app.services.token_service import authenticate_token
from fastapi import Body
from fastapi.security import OAuth2PasswordRequestForm


router = APIRouter()

swagger_data = {
    "user": Body(
        example={
            "email": "test@email.com",
            "password": "test"
        }),
    
    "user_register": Body(
        example={
            "full_name": "test@gmail.com",
            "crm_platform_account_code": "TEST123",
            "password": "test"
        }
    )
}

@router.post('/login', status_code=200)
def login_user(*, user_in: UsersLogin = swagger_data["user"], db: Session = Depends(deps.get_db)) -> Any:
    """
    Login user
    """
    user = auth_service.login(db, obj_in=user_in)
    return user

@router.post('/register', status_code=200)
def register_user(*, user_in: UsersRegister = swagger_data["user_register"], db: Session = Depends(deps.get_db)) -> Any:
    """
    Register user
    """
    result = auth_service.register(db, obj_in=user_in)
    return result

# Example authenticated endpoint
@router.get("/me")
def get_me(token: str = Depends(authenticate_token), db: Session = Depends(deps.get_db)):
    user = users_service.get_one(db, token['crm_platform_account_id'])
    return user