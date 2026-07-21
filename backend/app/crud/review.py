from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.review import Review
from app.schemas.review import ReviewCreate, ReviewUpdate


def create_review(db: Session, review: Review) -> Review:
    db.add(review)
    db.commit()
    db.refresh(review)
    return review


def get_review_by_id(db: Session, review_id: int) -> Review | None:
    return db.scalar(
        select(Review).where(Review.id == review_id)
    )


def get_review_by_user_and_hotel(
    db: Session,
    traveler_id: int,
    hotel_id: int,
) -> Review | None:
    return db.scalar(
        select(Review).where(
            Review.traveler_id == traveler_id,
            Review.hotel_id == hotel_id,
        )
    )


def get_reviews_by_hotel(
    db: Session,
    hotel_id: int,
) -> list[Review]:
    return list(
        db.scalars(
            select(Review).where(
                Review.hotel_id == hotel_id
            )
        ).all()
    )


def get_reviews_by_traveler(
    db: Session,
    traveler_id: int,
) -> list[Review]:
    return list(
        db.scalars(
            select(Review).where(
                Review.traveler_id == traveler_id
            )
        ).all()
    )


def update_review(
    db: Session,
    review: Review,
    review_update: ReviewUpdate,
) -> Review:
    update_data = review_update.model_dump(
        exclude_unset=True
    )

    for key, value in update_data.items():
        setattr(review, key, value)

    db.commit()
    db.refresh(review)

    return review


def delete_review(
    db: Session,
    review: Review,
) -> None:
    db.delete(review)
    db.commit()