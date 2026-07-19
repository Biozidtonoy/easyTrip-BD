from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordRequestForm

from app.core.security import hash_password
from app.crud.user import create_user, get_user_by_email
from app.db.database import get_db
from app.schemas.user import (UserCreate, UserResponse, Token)
from app.services.auth import authenticate_user


router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)

# register api

@router.post(
    "/register",
    response_model=UserResponse,
    status_code=status.HTTP_201_CREATED,
)
def register_user(
    user: UserCreate,
    db: Session = Depends(get_db),
):
    existing_user = get_user_by_email(
        db,
        user.email,
    )

    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered.",
        )

    hashed_password = hash_password(
        user.password,
    )

    new_user = create_user(
        db=db,
        user_data=user,
        hashed_password=hashed_password,
    )

    return new_user

# login api 

@router.post(
    "/login",
    response_model=Token,
    status_code=status.HTTP_200_OK,
)
def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db),
):
    return authenticate_user(
        db=db,
        email=form_data.username,
        password=form_data.password,
    )