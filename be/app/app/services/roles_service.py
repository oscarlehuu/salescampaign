from typing import List, Optional, Union, Dict, Any
from app.services.base import CRUDBase
from app.models.roles import Roles
from app.schemas.roles import RolesCreate, RolesUpdate, RolesInDB
from sqlalchemy.orm import Session


class RolesService(CRUDBase[Roles, RolesCreate, RolesUpdate]):

    def get_all(self, db: Session) -> List[RolesInDB]:
        return db.query(Roles).all()
    
    def create(self, db: Session, *, obj_in: RolesCreate) -> Roles:
        create_data = obj_in.dict()
        db_obj = Roles(**create_data)
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def update(
        self, db: Session, *, db_obj: Roles, obj_in: Union[RolesUpdate, Dict[str, Any]]
    ) -> Roles:
        if isinstance(obj_in, dict):
            update_data = obj_in
        else:
            update_data = obj_in.dict(exclude_unset=True)

        return super().update(db, db_obj=db_obj, obj_in=update_data)


roles_service = RolesService(Roles)
