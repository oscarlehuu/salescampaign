class SubscriptionsResponse:
    def __init__(self, id, name, account, billingTo, status, quantity, createdAt, subscriptionAmount, activationDate):
        self.id = id
        self.name = name
        self.account = account
        self.billingTo = billingTo
        self.status = status
        self.quantity = quantity
        self.createdAt = createdAt
        self.subscriptionAmount = subscriptionAmount
        self.activationDate = activationDate

    @classmethod
    def from_dict(cls, data):
        return cls (
            id = data.get("id"),
            name = data.get("name"),
            account = data.get("account"),
            billingTo = data.get("billingTo"),
            status = data.get("status"),
            quantity = data.get("quantity"),
            createdAt = data.get("createdAt"),
            subscriptionAmount = data.get("subscriptionAmount"),
            activationDate = data.get("activationDate")
        )