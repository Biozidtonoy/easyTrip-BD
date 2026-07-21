from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.crud import booking as booking_crud
from app.crud import hotel as hotel_crud
from app.crud import review as review_crud
from app.enums.booking_status import BookingStatus
from app.enums.user_role import UserRole
from app.models.review import Review
from app.models.user import User
from app.schemas.review import ReviewCreate, ReviewUpdate




def create_review_service(
    db: Session,
    review_data: ReviewCreate,
    current_user: User,
) -> Review:
    
    if current_user.role != UserRole.TRAVELER:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only travelers can submit reviews.",
        )
    
    hotel = hotel_crud.get_hotel_by_id(
        db,
        review_data.hotel_id,
    )

    if not hotel:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Hotel not found.",
        )
    
    existing_review = review_crud.get_review_by_user_and_hotel(
        db,
        current_user.id,
        review_data.hotel_id,
    )

    if existing_review:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="You have already reviewed this hotel.",
        )
    
    bookings = booking_crud.get_bookings_by_traveler(
        db,
        current_user.id,
    )

    completed_booking = any(
        booking.room.hotel_id == review_data.hotel_id
        and booking.status == BookingStatus.COMPLETED
        for booking in bookings
    )

    if not completed_booking:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You can only review hotels after completing a stay.",
        )
    
    review = Review(
        traveler_id=current_user.id,
        hotel_id=review_data.hotel_id,
        rating=review_data.rating,
        comment=review_data.comment,
    )

    return review_crud.create_review(
        db,
        review,
    )

def get_review_service(
    db: Session,
    review_id: int,
) -> Review:
    review = review_crud.get_review_by_id(
        db,
        review_id,
    )

    if not review:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Review not found.",
        )

    return review

def list_hotel_reviews_service(
    db: Session,
    hotel_id: int,
):
    return review_crud.get_reviews_by_hotel(
        db,
        hotel_id,
    )


def list_my_reviews_service(
    db: Session,
    current_user: User,
):
    return review_crud.get_reviews_by_traveler(
        db,
        current_user.id,
    )

def update_review_service(
    db: Session,
    review_id: int,
    review_update: ReviewUpdate,
    current_user: User,
) -> Review:
    review = get_review_service(
        db,
        review_id,
    )

    if review.traveler_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You can only update your own reviews.",
        )

    return review_crud.update_review(
        db,
        review,
        review_update,
    )

def delete_review_service(
    db: Session,
    review_id: int,
    current_user: User,
):
    review = get_review_service(
        db,
        review_id,
    )

    if review.traveler_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You can only delete your own reviews.",
        )

    review_crud.delete_review(
        db,
        review,
    )