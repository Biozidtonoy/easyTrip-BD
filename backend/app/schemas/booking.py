from datetime import date, datetime
from decimal import Decimal

from pydantic import ConfigDict, BaseModel
# from app.models.base import BaseModel
from app.enums.booking_status import BookingStatus
from app.enums.payment_status import PaymentStatus
from app.enums.room_type import RoomType

class BookingCreate(BaseModel):
    room_id: int
    check_in_date: date
    check_out_date: date
    special_requests: str | None = None


class BookingUpdate(BaseModel):
    check_in_date: date | None = None
    check_out_date: date | None = None
    special_requests: str | None = None


class BookingResponse(BaseModel):
    id: int
    booking_reference: str
    traveler_id: int
    room_id: int
    check_in_date: date
    check_out_date: date
    status: BookingStatus
    total_price: Decimal
    payment_status: PaymentStatus
    cancellation_reason: str | None
    special_requests: str | None
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)


class HotelSummary(BaseModel):
    id: int
    name: str

    model_config = ConfigDict(from_attributes=True)


class RoomSummary(BaseModel):
    id: int
    room_number: str
    room_type: RoomType
    hotel: HotelSummary

    model_config = ConfigDict(from_attributes=True)


class BookingListResponse(BaseModel):
    id: int
    booking_reference: str

    room: RoomSummary

    check_in_date: date
    check_out_date: date

    status: BookingStatus
    total_price: Decimal
    payment_status: PaymentStatus

    cancellation_reason: str | None
    special_requests: str | None

    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)