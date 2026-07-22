from decimal import Decimal
from sqlalchemy import UniqueConstraint

from sqlalchemy import (
    Boolean,
    ForeignKey,
    Integer,
    Numeric,
    String,
    Enum as SQLEnum,
)
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.enums.room_type import RoomType
from app.models.base import BaseModel
from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from app.models.hotel import Hotel

if TYPE_CHECKING:
    from app.models.booking import Booking

if TYPE_CHECKING:
    from app.models.room_image import RoomImage

class Room(BaseModel):
    __tablename__ = "rooms"

    __table_args__ = (
        UniqueConstraint(
        "hotel_id",
        "room_number",
        name="uq_hotel_room_number",
        ),
    )

    hotel_id: Mapped[int] = mapped_column(
        ForeignKey("hotels.id"),
        nullable=False,
    )

    room_number: Mapped[str] = mapped_column(
        String(20),
        nullable=False,
    )

    room_type: Mapped[RoomType] = mapped_column(
        SQLEnum(RoomType),
        nullable=False,
    )

    price_per_night: Mapped[Decimal] = mapped_column(
        Numeric(10, 2),
        nullable=False,
    )

    capacity: Mapped[int] = mapped_column(
        Integer,
        nullable=False,
    )

    is_available: Mapped[bool] = mapped_column(
        Boolean,
        default=True,
        server_default="true",
        nullable=False,
    )

    hotel: Mapped["Hotel"] = relationship(
        back_populates="rooms",
    )

    bookings: Mapped[list["Booking"]] = relationship(
        back_populates="room",
        cascade="all, delete-orphan",
    )

    images: Mapped[list["RoomImage"]] = relationship(
        back_populates="room",
        cascade="all, delete-orphan",
    )