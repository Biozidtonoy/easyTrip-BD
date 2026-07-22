from datetime import date
from decimal import Decimal
from uuid import uuid4
from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.crud.booking import (
    create_booking,
    delete_booking,
    get_booking_by_id,
    get_bookings,
    get_bookings_by_room,
    get_bookings_by_traveler,
    update_booking,
)

from app.crud.room import get_room_by_id
from app.models.user import User
from app.schemas.booking import BookingCreate, BookingUpdate
from app.enums.user_role import UserRole
from app.models.booking import Booking
from app.enums.booking_status import BookingStatus
from app.models.room import Room






def validate_booking_dates(
    check_in: date,
    check_out: date,
) -> None:
   
    if check_in < date.today():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Check-in date cannot be in the past.",
        )

    if check_in >= check_out:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Check-out date must be after check-in date.",
        )
    

def is_room_available(
    existing_bookings: list[Booking],
    check_in: date,
    check_out: date,
) -> bool:
    for booking in existing_bookings:
        if booking.status == BookingStatus.CANCELLED:
            continue

        if (
            check_in < booking.check_out_date
            and check_out > booking.check_in_date
        ):
            return False

    return True

def calculate_total_price(
    room: Room,
    check_in: date,
    check_out: date,
) -> Decimal:

    number_of_nights = (check_out - check_in).days

    return room.price_per_night * Decimal(number_of_nights)

def generate_booking_reference() -> str:
    return (
        f"BK-{date.today():%Y%m%d}-"
        f"{uuid4().hex[:8].upper()}"
    )


def create_booking_service(
    db: Session,
    booking_data: BookingCreate,
    current_user: User,
):
    """
    Create a new booking.
    """

    # 1. Validate booking dates
    validate_booking_dates(
        booking_data.check_in_date,
        booking_data.check_out_date,
    )

    # 2. Ensure only travelers can book rooms
    if current_user.role != UserRole.TRAVELER:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only travelers can create bookings.",
        )

    # 3. Check if the room exists
    room = get_room_by_id(db, booking_data.room_id)

    if room is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Room not found.",
        )

    # 4. Check room availability
    existing_bookings = get_bookings_by_room(
        db,
        room.id,
    )

    if not is_room_available(
        existing_bookings,
        booking_data.check_in_date,
        booking_data.check_out_date,
    ):
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Room is already booked for the selected dates.",
        )

    # 5. Calculate total price
    total_price = calculate_total_price(
        room,
        booking_data.check_in_date,
        booking_data.check_out_date,
    )

    # 6. Generate booking reference
    booking_reference = generate_booking_reference()

    # 7. Create booking
    booking = create_booking(
        db=db,
        booking_data=booking_data,
        traveler_id=current_user.id,
        booking_reference=booking_reference,
        total_price=total_price,
    )

    return booking


def get_booking_service(
    db: Session,
    booking_id: int,
    current_user: User,
):

    booking = get_booking_by_id(db, booking_id)

    if booking is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Booking not found.",
        )

    if (
        current_user.role == UserRole.TRAVELER
        and booking.traveler_id != current_user.id
    ):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You are not allowed to access this booking.",
        )

    return booking

def list_bookings_service(
    db: Session,
    current_user: User,
):
    if current_user.role == UserRole.ADMIN:
        return get_bookings(db)

    return get_bookings_by_traveler(
        db,
        current_user.id,
    )

def update_booking_service(
    db: Session,
    booking_id: int,
    booking_data: BookingUpdate,
    current_user: User,
):
    booking = get_booking_by_id(db, booking_id)

    if booking is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Booking not found.",
        )

    if booking.traveler_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You are not allowed to update this booking.",
        )

    check_in = (
        booking_data.check_in_date
        if booking_data.check_in_date is not None
        else booking.check_in_date
    )

    check_out = (
        booking_data.check_out_date
        if booking_data.check_out_date is not None
        else booking.check_out_date
    )

    validate_booking_dates(check_in, check_out)

    existing_bookings = [
        b
        for b in get_bookings_by_room(db, booking.room_id)
        if b.id != booking.id
    ]

    if not is_room_available(
        existing_bookings,
        check_in,
        check_out,
    ):
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Room is already booked for the selected dates.",
        )

    room = get_room_by_id(db, booking.room_id)

    booking.total_price = calculate_total_price(
        room,
        check_in,
        check_out,
    )

    return update_booking(
        db,
        booking,
        booking_data,
    )


def delete_booking_service(
    db: Session,
    booking_id: int,
    current_user: User,
):
    booking = get_booking_by_id(
        db,
        booking_id,
    )

    if booking is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Booking not found.",
        )

    if booking.traveler_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You are not allowed to delete this booking.",
        )

    delete_booking(
        db,
        booking,
    )