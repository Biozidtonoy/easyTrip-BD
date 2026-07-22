from sqlalchemy.orm import Session
from sqlalchemy import select
from app.models.hotel import Hotel
from app.schemas.hotel import HotelCreate, HotelUpdate


def create_hotel(
    db: Session,
    hotel_data: HotelCreate,
    owner_id: int,
    image: str,
) -> Hotel:
    hotel = Hotel(
        **hotel_data.model_dump(),
        owner_id=owner_id,
        image=image,
    )

    db.add(hotel)
    db.commit()
    db.refresh(hotel)

    return hotel

def get_hotel_by_id(db: Session,hotel_id: int,) -> Hotel | None:
    return db.scalar(
        select(Hotel).where(
            Hotel.id == hotel_id
        )
    )


def get_hotels(db: Session,) -> list[Hotel]:
    return list(
        db.scalars(
            select(Hotel)
        ).all()
    )

def update_hotel(db: Session,hotel: Hotel,hotel_data: HotelUpdate,) -> Hotel:
    update_data = hotel_data.model_dump(
        exclude_unset=True
    )

    for field, value in update_data.items():
        setattr(hotel, field, value)

    db.commit()
    db.refresh(hotel)

    return hotel


def delete_hotel(db: Session,hotel: Hotel,) -> None:
    db.delete(hotel)
    db.commit()