from pydantic import BaseModel

class SubscriptionsBase(BaseModel):
    name: str
    account: object
    billingTo: object
    status: str
    activationDate: str
    quantity: int

class SubscriptionsInDBBase(SubscriptionsBase):
    id: int
    
    class Config:
        orm_mode = True
        
class SubscriptionsCreate(SubscriptionsBase):
    ...
    
# Properties to receive via API on update
class SubscriptionsUpdate(SubscriptionsBase): 
    ...

# Additional properties stored in DB but not returned by API
class SubscriptionsInDB(SubscriptionsInDBBase):
    ...

# Additional properties to return via API
class Subscriptions(SubscriptionsInDBBase):
    ...