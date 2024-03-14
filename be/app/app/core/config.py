import pathlib
from enum import Enum
from pydantic import BaseSettings, Field
import os
from dotenv import load_dotenv

load_dotenv()

ROOT_PATH: str = pathlib.Path(__file__).resolve().parent.parent
MODEL_PATH: str = f'{ROOT_PATH}/db/data-seed'
DATA_SEED_PATH: str = f'{ROOT_PATH}/db/data-seed/users.json'

class Base(BaseSettings):
    API_V1_STR: str = Field("/api/", env='API_PREFIX')
    HOST: str = Field("localhost", env='HOST')
    PORT: int = Field(8000, env='PORT')
    APP_MODULE: str = 'app.main:app'

    DB_URI = Field('mssql', env='DB_URI')

    class Config:
        case_sensitive = True
        env_file = '.env'


class Dev(Base):

    class Config:
        env_file = '.dev.env'


class Docker(Base):

    class Config:
        env_file = '.docker.env'


config = dict(
    dev=Dev,
    docker=Docker
)


settings = config[os.environ.get('ENVIRONMENT', 'dev').lower()]()
