from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.booking import Booking
from app.schemas.booking import BookingCreate, BookingUpdate

def create_booking(
    db: Session,
    booking_data: BookingCreate,
    traveler_id: int,
    booking_reference: str,
    total_price: float,
) -> Booking:
    booking = Booking(
        booking_reference=booking_reference,
        traveler_id=traveler_id,
        room_id=booking_data.room_id,
        check_in_date=booking_data.check_in_date,
        check_out_date=booking_data.check_out_date,
        special_requests=booking_data.special_requests,
        total_price=total_price,
    )

    db.add(booking)
    db.commit()
    db.refresh(booking)

    return booking

def get_booking_by_id(
    db: Session,
    booking_id: int,
) -> Booking | None:
    return db.scalar(
        select(Booking).where(Booking.id == booking_id)
    )

def get_booking_by_reference(
    db: Session,
    booking_reference: str,
) -> Booking | None:
    return db.scalar(
        select(Booking).where(
            Booking.booking_reference == booking_reference
        )
    )

def get_bookings(
    db: Session,
) -> list[Booking]:
    return list(
        db.scalars(
            select(Booking)
        ).all()
    )

def get_bookings_by_traveler(
    db: Session,
    traveler_id: int,
) -> list[Booking]:
    return list(
        db.scalars(
            select(Booking).where(
                Booking.traveler_id == traveler_id
            )
        ).all()
    )

def get_bookings_by_room(
    db: Session,
    room_id: int,
) -> list[Booking]:
    return list(
        db.scalars(
            select(Booking).where(
                Booking.room_id == room_id
            )
        ).all()
    )

def update_booking(
    db: Session,
    booking: Booking,
    booking_data: BookingUpdate,
) -> Booking:

    update_data = booking_data.model_dump(
        exclude_unset=True
    )

    for field, value in update_data.items():
        setattr(booking, field, value)

    db.commit()
    db.refresh(booking)

    return booking

def delete_booking(
    db: Session,
    booking: Booking,
) -> None:
    db.delete(booking)
    db.commit()