from pwdlib import PasswordHash
from fastapi import HTTPException, status
from datetime import datetime, timedelta, timezone
from jose import jwt, JWTError
from app.core.config import settings

from fastapi.security import OAuth2PasswordBearer
from app.schemas.user import TokenData

from fastapi import Depends
from sqlalchemy.orm import Session

from app.crud.user import get_user_by_email
from app.db.database import get_db
from app.models.user import User
from app.enums.user_role import UserRole
from collections.abc import Callable

password_hash = PasswordHash.recommended()

def hash_password(password: str) -> str:
    return password_hash.hash(password)

def verify_password(password: str, hashed_password: str) -> bool:
    return password_hash.verify(password, hashed_password)

def create_access_token(subject: str,) -> str:
    expire = datetime.now(timezone.utc) + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)

    payload = {
        "sub": subject,
        "exp": expire,
    }

    return jwt.encode(
        payload,
        settings.SECRET_KEY,
        algorithm=settings.ALGORITHM,
    )

oauth2_scheme = OAuth2PasswordBearer(
    tokenUrl="/auth/login",
)

def decode_access_token(token: str) -> TokenData:
    try:
        payload = jwt.decode(
            token,
            settings.SECRET_KEY,
            algorithms=[settings.ALGORITHM],
        )

        email = payload.get("sub")

        if email is None:
            raise JWTError()

        return TokenData(email=email)

    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
        )


def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db),
) -> User:
    token_data = decode_access_token(token)

    user = get_user_by_email(
        db,
        token_data.email,
    )

    if user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
        )

    return user

def require_roles(*allowed_roles: UserRole) -> Callable:
    def role_checker(
        current_user: User = Depends(get_current_user),
    ) -> User:

        if current_user.role not in allowed_roles:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="You do not have permission to perform this action.",
            )

        return current_user

    return role_checker