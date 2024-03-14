from app.services.base import CRUDBase
from .CRM_PLATFORM_Client import CRM_PLATFORMAPI
from .campaigns_service import campaigns_service
from app.schemas.subscriptions import SubscriptionsInDB, Subscriptions, SubscriptionsCreate
from sqlalchemy.orm import Session
import datetime

class SubscriptionsService(CRUDBase[SubscriptionsInDB, Subscriptions, SubscriptionsCreate]):
    def get_subscriptions(self, db: Session, token):
        # 7 days ago
        # date = (datetime.datetime.today() - datetime.timedelta(days=7)).strftime("%Y-%m-%d")

        # active campaign start date
        start_date = campaigns_service.get_active_start_date(db)
        date = start_date.strftime("%Y-%m-%d")
        return CRM_PLATFORMAPI.getNewSubscription(date=date, token=token)
    
    def get_ranking(self, db: Session, token):
        # 7 days ago
        # date = (datetime.datetime.today() - datetime.timedelta(days=7)).strftime("%Y-%m-%d")

        # active campaign start date
        start_date = campaigns_service.get_active_start_date(db)
        date = start_date.strftime("%Y-%m-%d")
        return CRM_PLATFORMAPI.getSubscriptionRanking(date=date, token=token)

subscriptions_service = SubscriptionsService(Subscriptions)
    