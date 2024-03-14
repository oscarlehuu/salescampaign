from fastapi import APIRouter
from app.api.api_v1.endpoints import users, auth, roles, campaigns, subscriptions

api_router = APIRouter()
api_router.include_router(users.router, prefix='/users', tags=["users"])
api_router.include_router(auth.router, prefix='/auth', tags=["auth"])
api_router.include_router(roles.router, prefix='/roles', tags=["roles"])
api_router.include_router(campaigns.router, prefix='/campaigns', tags=["campaigns"])
api_router.include_router(subscriptions.router, prefix='/subscriptions', tags=["subscriptions"])
