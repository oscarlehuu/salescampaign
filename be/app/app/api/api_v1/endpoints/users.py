from typing import Any, List
from fastapi import APIRouter, Depends
from app.schemas.users import UsersInDB, UsersUpdate
from app.api import deps
from sqlalchemy.orm import Session
from app.services.users_service import users_service
from app.services.token_service import authenticate_token
from fastapi import Body
from app.models.users import Users


router = APIRouter()

swagger_data = {
    "user": Body(
        example={
            "email": "test@email.com",
            "fullName": "test",
            "password": "test"
        }),
}

@router.get('/', status_code=200, response_model=List[UsersInDB])
def fetch_all(*, db: Session = Depends(deps.get_db)) -> Any:
    """
    Fetch all users info
    """
    return users_service.get_all(db)

@router.put('/{user_id}', status_code=200)
def update_by_id(*, user_id: int, user: UsersUpdate, db: Session = Depends(deps.get_db)):
    """
    Update user by ID
    """
    return users_service.                                                                                                                                                                    update(db, user_id, user)

@router.get('/{crm_platform_account_id}', status_code=200)
def fetch_by_id(*, db: Session = Depends(deps.get_db), crm_platform_account_id: int) -> Any:
    """
    Fetch all user by id
    """
    return users_service.get_one(db, crm_platform_account_id)

@router.delete('/{user_id}', status_code=200)
def delete_by_id(*, user_id: int, db: Session = Depends(deps.get_db)):
    """
    Delete user by ID
    """
    return users_service.remove(db, user_id)

@router.delete('/', status_code=200)
def delete_users(*, db: Session = Depends(deps.get_db)):
    """
    Delete all users
    """
    return users_service.remove_all(db)

@router.get('/recent/endusers', status_code=200)
def fetch_all_reseller_new_users(*, token: str = Depends(authenticate_token), db: Session = Depends(deps.get_db)) -> Any:
    """
    Fetch all new users info of reseller
    """
    return users_service.get_new_endusers(db, token)