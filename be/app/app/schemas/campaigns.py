from pydantic import BaseModel, validator
from typing import Optional
from sqlalchemy import func, sql
from datetime import datetime
class CampaignsBase(BaseModel):
    name: str
    status: str

    @validator('name', 'status')
    def is_str(cls, v):
        if not isinstance(v, str):
            raise TypeError('Value must be a string')
        return v

# Properties to receive via API on creation
class CampaignsCreate(CampaignsBase):
    status: Optional[str] = "Active"
    
# Properties to receive via API on update
class CampaignsUpdate(CampaignsBase): 
    status: Optional[str]
    name:   Optional[str] 
    start_date: Optional[datetime]
    end_date: Optional[datetime]

class CampaignsInDBBase(CampaignsBase):
    id: int
    start_date: datetime
    end_date: datetime
    class Config:
        orm_mode = True

# Additional properties stored in DB but not returned by API
class CampaignsInDB(CampaignsInDBBase):
    ...

# Additional properties to return via API
class Campaigns(CampaignsInDBBase):
    ...
