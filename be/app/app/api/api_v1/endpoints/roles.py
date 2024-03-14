from typing import Any, List
from fastapi import APIRouter, Depends
from app.schemas.roles import RolesInDB
from app.api import deps
from sqlalchemy.orm import Session
from app.services.roles_service import roles_service
from fastapi import Body
from be.app.app.services.CRM_PLATFORM_Client import CRM_PLATFORMClient

router = APIRouter()

swagger_data = {
    "role": Body(
        example={
            "name": "user",
        }),
}

@router.get('/', status_code=200, response_model=List[RolesInDB])
def fetch_all(*, db: Session = Depends(deps.get_db)) -> Any:
    """
    Fetch all roles info
    """
    return roles_service.get_all(db)