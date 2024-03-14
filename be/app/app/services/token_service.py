from typing import List, Optional
from datetime import datetime, timedelta
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from passlib.context import CryptContext
from app.models.users import Users
import hashlib
import jwt
import os
from dotenv import load_dotenv
load_dotenv()


# Password hash algorithm
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

# Hashing function for JWT secret key
def hash_secret_key(key: str) -> str:
    key_sha = hashlib.sha256()
    key_sha.update(key.encode('utf-8'))
    return key_sha.hexdigest()

JWT_SECRET_HASHED = hash_secret_key(os.getenv('JWT_SECRET'))

# Function for creating JWT tokens
def create_jwt_token(user, issued_min: Optional[int] = 0, expires_min: Optional[int] = os.getenv('JWT_EXPIRATION_MS')):
    """
    Creates a JWT token with the given user ID and an issued time, which defaults to the current time.
    The expiration time also defaults to 15 minutes from the issued time.
    """
    now = datetime.utcnow()
    issued_at = now + timedelta(minutes=issued_min)
    expires_at = issued_at + timedelta(minutes=int(expires_min))
    # Create the payload
    payload = {
        "user": user,
        "iat": issued_at,
        "exp": expires_at
    }

    token = jwt.encode(payload, JWT_SECRET_HASHED, algorithm="HS256")
    return token

# Dependency for authetenticating a JWT token
def authenticate_token(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, JWT_SECRET_HASHED, algorithms=["HS256"])
        user = payload["user"]
        return user
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Token has expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")