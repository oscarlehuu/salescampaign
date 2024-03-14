from app.db.base_class import Base
from sqlalchemy import Column, Integer, String, UniqueConstraint, DateTime, ForeignKey, func
from sqlalchemy.orm import relationship

class Users(Base):
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(256), nullable=False)
    full_name = Column(String(256), nullable=False)
    password = Column(String(20), nullable=False)
    created_date = Column(DateTime, server_default=func.current_timestamp())
    crm_platform_account_id = Column(String(256), unique=True, nullable=False)
    crm_platform_account_code = Column(String(256), unique=True, nullable=False)
    role_id = Column(Integer, ForeignKey('roles.id'), nullable=False)
    role = relationship("Roles", back_populates="users")

    __table_args__ = (UniqueConstraint(email, name='USER_EMAIL_UC'),)