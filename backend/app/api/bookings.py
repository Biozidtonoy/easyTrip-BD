from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.core.security import get_current_user
from app.models.user import User
from app.schemas.booking import (
    BookingCreate,
    BookingResponse,
    BookingUpdate,
    BookingRejection,
    BookingListResponse,
)
from app.services.booking import (
    create_booking_service,
    delete_booking_service,
    get_booking_service,
    list_bookings_service,
    list_owner_bookings_service,
    update_booking_service,
    confirm_booking_service,
    reject_booking_service,
)

router = APIRouter(
    prefix="/bookings",
    tags=["Bookings"],
)

@router.post(
    "",
    response_model=BookingResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_booking(
    booking_data: BookingCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return create_booking_service(
        db=db,
        booking_data=booking_data,
        current_user=current_user,
    )

@router.get(
    "",
    response_model=list[BookingListResponse],
)
def list_bookings(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return list_bookings_service(
        db=db,
        current_user=current_user,
    )

# hotel owner bookings 
@router.get(
    "/owner",
    response_model=list[BookingListResponse],
)
def list_owner_bookings(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return list_owner_bookings_service(
        db=db,
        current_user=current_user,
    )

@router.patch(
    "/{booking_id}/confirm",
    response_model=BookingListResponse,
)
def confirm_booking(
    booking_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return confirm_booking_service(
        db=db,
        booking_id=booking_id,
        current_user=current_user,
    )

@router.patch(
    "/{booking_id}/reject",
    response_model=BookingListResponse,
)
def reject_booking(
    booking_id: int,
    rejection_data: BookingRejection,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return reject_booking_service(
        db=db,
        booking_id=booking_id,
        cancellation_reason=rejection_data.cancellation_reason,
        current_user=current_user,
    )



@router.get(
    "/{booking_id}",
    response_model=BookingListResponse,
)
def get_booking(
    booking_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return get_booking_service(
        db=db,
        booking_id=booking_id,
        current_user=current_user,
    )

@router.patch(
    "/{booking_id}",
    response_model=BookingResponse,
)
def update_booking(
    booking_id: int,
    booking_data: BookingUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return update_booking_service(
        db=db,
        booking_id=booking_id,
        booking_data=booking_data,
        current_user=current_user,
    )

@router.delete(
    "/{booking_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
def delete_booking(
    booking_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    delete_booking_service(
        db=db,
        booking_id=booking_id,
        current_user=current_user,
    )