from typing import Any
from fastapi import APIRouter, Depends
from app.services.subscriptions_service import subscriptions_service
from app.services.campaigns_service import campaigns_service
from app.services.token_service import authenticate_token
from fastapi import Body
from app.api import deps
from sqlalchemy.orm import Session

router = APIRouter()

swagger_data = {
    "subscription": Body(
        example={
            "name": "test",
            "account": {},
            "billingTo": {},
            "status": "test",
            "activationDate": "test",
            "quantity": 0
        }),
}

@router.get('/', status_code=200)
def fetch_all(*, token: str = Depends(authenticate_token), db: Session = Depends(deps.get_db)) -> Any:
    """
    Fetch all active subscriptions
    """
    return subscriptions_service.get_subscriptions(db, token)


@router.get('/ranking', status_code=200)
def fetch_ranking(*, token: str = Depends(authenticate_token), db: Session = Depends(deps.get_db)) -> Any:
    """
    Fetch all current ranking
    """
    return subscriptions_service.get_ranking(db, token)