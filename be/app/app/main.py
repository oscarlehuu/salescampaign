from pathlib import Path

from fastapi import FastAPI, APIRouter, Request, Depends
from fastapi.middleware.cors import CORSMiddleware

from sqlalchemy.orm import Session

from app.api.deps import get_db
from app.api.api_v1.api import api_router
from app.core.config import settings

BASE_PATH = Path(__file__).resolve().parent

root_router = APIRouter()
app = FastAPI(title="CRM PLATFORM SERVER")

origins = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@root_router.get("/", status_code=200)
def root(
    request: Request,
    db: Session = Depends(get_db),
) -> dict:
    """
    Root GET
    """

    return {
        "msg": 'Hello world'
    }

app.include_router(api_router, prefix=settings.API_V1_STR)
app.include_router(root_router)

def start():
    import uvicorn
    uvicorn.run("app.main:app", host=settings.HOST, port=settings.PORT, reload=True)
