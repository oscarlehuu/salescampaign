from app.db.base_class import Base
from sqlalchemy import Column, Integer, String, UniqueConstraint, DateTime, func, text

class Campaigns(Base):
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(256), nullable=False)
    status = Column(String(256), nullable=False, default="Active")
    start_date = Column(DateTime, server_default=func.current_timestamp())
    end_date = Column(DateTime, server_default=text("(DATEADD(day, 14, CAST(GETDATE() AS DATETIME)))"))

    __table_args__ = (UniqueConstraint(name, name='CAMPAIGN_NAME_UC'),)