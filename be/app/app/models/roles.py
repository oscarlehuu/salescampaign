from app.db.base_class import Base
from sqlalchemy import Column, Integer, String, UniqueConstraint
from sqlalchemy.orm import relationship

class Roles(Base):
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(256), nullable=False)
    
    users = relationship('Users', back_populates='role')

    __table_args__ = (UniqueConstraint(name, name='ROLE_NAME_UC'),)