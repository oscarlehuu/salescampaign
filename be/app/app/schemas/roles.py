from pydantic import BaseModel, validator
from typing import Optional

class RolesBase(BaseModel):
    name: str

    @validator('name')
    def is_str(cls, v):
        if not isinstance(v, str):
            raise TypeError('Value must be a string')
        return v

# Properties to receive via API on creation
class RolesCreate(RolesBase):
    ...
    
# Properties to receive via API on update
class RolesUpdate(RolesBase): 
    ...

class RolesInDBBase(RolesBase):
    id: int
    
    class Config:
        orm_mode = True

# Additional properties stored in DB but not returned by API
class RolesInDB(RolesInDBBase):
    ...

# Additional properties to return via API
class Roles(RolesInDBBase):
    ...
