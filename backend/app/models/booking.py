from datetime import date
from decimal import Decimal

from sqlalchemy import Date, Enum, ForeignKey, Numeric, String, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.models.base import BaseModel
from app.enums.booking_status import BookingStatus
from app.enums.payment_status import PaymentStatus
from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from app.models.room import Room
    from app.models.user import User


class Booking(BaseModel):
    __tablename__ = "bookings"

    booking_reference: Mapped[str] = mapped_column(
        String(30),
        unique=True,
        index=True,
        nullable=False,
    )

    traveler_id: Mapped[int] = mapped_column(
        ForeignKey("users.id"),
        nullable=False,
    )

    room_id: Mapped[int] = mapped_column(
        ForeignKey("rooms.id"),
        nullable=False,
    )

    check_in_date: Mapped[date] = mapped_column(
        Date,
        nullable=False,
    )

    check_out_date: Mapped[date] = mapped_column(
        Date,
        nullable=False,
    )

    status: Mapped[BookingStatus] = mapped_column(
        Enum(BookingStatus),
        default=BookingStatus.PENDING,
        nullable=False,
    )

    total_price: Mapped[Decimal] = mapped_column(
        Numeric(10, 2),
        nullable=False,
    )

    payment_status: Mapped[PaymentStatus] = mapped_column(
        Enum(PaymentStatus),
        default=PaymentStatus.PENDING,
        nullable=False,
    )

    cancellation_reason: Mapped[str | None] = mapped_column(
        Text,
        nullable=True,
    )

    special_requests: Mapped[str | None] = mapped_column(
        Text,
        nullable=True,
    )

    traveler: Mapped["User"] = relationship(
        back_populates="bookings",
    )

    room: Mapped["Room"] = relationship(
        back_populates="bookings",
    )