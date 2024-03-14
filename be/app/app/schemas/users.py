from app.utils.validation import isEmail
from pydantic import BaseModel, validator
from typing import Optional
from datetime import datetime

class UsersBase(BaseModel):
    email: str
    full_name: str
    password: str
    crm_platform_account_code: str
    role_id: int

    @validator('email', 'full_name', 'password', 'crm_platform_account_code')
    def is_str(cls, v):
        if not isinstance(v, str):
            raise TypeError('Value must be a string')
        return v
    @validator('email')
    def is_email(cls, email):
        return isEmail(email)

# Properties to receive via API on creation
class UsersRegister(UsersBase):
    # crm_platform_account_code: str
    role_id: Optional[int] = 2
    
class UsersLogin(UsersBase):
    full_name: Optional[str]
    role_id: Optional[int]

# Properties to receive via API on update
class UsersUpdate(UsersBase): 
    full_name: Optional[str]
    crm_platform_account_code: Optional[str]
    email: Optional[str]
    password: Optional[str]

class UsersInDBBase(UsersBase):
    id: int
    crm_platform_account_id: str
    created_date: datetime
    
    class Config:
        orm_mode = True

# Additional properties stored in DB but not returned by API
class UsersInDB(UsersInDBBase):
    ...

# Additional properties to return via API
class Users(UsersInDBBase):
    class Config:
        fields = {'password': {'exclude': True}}
