import logging
import sqlalchemy
from sqlalchemy.orm import Session

from app.schemas.users import UsersCreate
from app.services.users_service import users_service
from app.db.base_class import Base
from app.db.session import engine
import json
from app.core.config import DATA_SEED_PATH

logger = logging.getLogger(__name__)


# make sure all SQL Alchemy models are imported (app.db.base) before initializing DB
# otherwise, SQL Alchemy might fail to initialize relationships properly
# for more details: https://github.com/tiangolo/full-stack-fastapi-postgresql/issues/28


def init_db(db: Session) -> None:
    logger.info(Base)
    if not sqlalchemy.inspect(engine).has_table("USERS"):
        Base.metadata.create_all(bind=engine)
        with open(DATA_SEED_PATH, 'r') as f:
            list_users = json.loads(f.read())
            for user in list_users:
                user_in = UsersCreate(**user)
                users_service.create(db, obj_in=user_in)
