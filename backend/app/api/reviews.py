from fastapi import APIRouter, Depends, Response, status
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.core.security import get_current_user
from app.models.user import User
from app.schemas.review import (
    ReviewCreate,
    ReviewResponse,
    ReviewUpdate,
)
from app.services.review import (
    create_review_service,
    delete_review_service,
    get_review_service,
    list_hotel_reviews_service,
    list_my_reviews_service,
    update_review_service,
)

router = APIRouter(
    prefix="/reviews",
    tags=["Reviews"],
)

@router.post(
    "",
    response_model=ReviewResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_review(
    review_data: ReviewCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return create_review_service(
        db,
        review_data,
        current_user,
    )

@router.get(
    "/{review_id}",
    response_model=ReviewResponse,
)
def get_review(
    review_id: int,
    db: Session = Depends(get_db),
):
    return get_review_service(
        db,
        review_id,
    )

@router.get(
    "/my",
    response_model=list[ReviewResponse],
)
def get_my_reviews(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return list_my_reviews_service(
        db,
        current_user,
    )

@router.patch(
    "/{review_id}",
    response_model=ReviewResponse,
)
def update_review(
    review_id: int,
    review_update: ReviewUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return update_review_service(
        db,
        review_id,
        review_update,
        current_user,
    )

@router.delete(
    "/{review_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
def delete_review(
    review_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    delete_review_service(
        db,
        review_id,
        current_user,
    )

    return Response(status_code=status.HTTP_204_NO_CONTENT)