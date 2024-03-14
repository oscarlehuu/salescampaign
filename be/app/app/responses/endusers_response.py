class EndusersResponse:
    def __init__(self, id, name, email, billToAccount, createdAt):
        self.id = id
        self.name = name
        self.email = email
        self.billToAccount = billToAccount
        self.createdAt = createdAt

    @classmethod
    def from_dict(cls, data):
        return cls (
            id = data.get("id"),
            name = data.get("name"),
            billToAccount = data.get("billToAccount"),
            email = data.get("email"),
            createdAt = data.get("createdAt")
        )