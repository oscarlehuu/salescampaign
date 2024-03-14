import re

reEmail = re.compile(r'([A-Za-z0-9]+[.-_])*[A-Za-z0-9]+@[A-Za-z0-9-]+(\.[A-Z|a-z]{2,})+')

def isEmail(data):
    if not re.fullmatch(reEmail, data):
        raise ValueError(f'Invalid email address: {data}')
    return data
    