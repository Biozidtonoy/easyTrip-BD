from sqlalchemy import ForeignKey, String, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.models.base import BaseModel
from app.models.destination import Destination
from app.models.room import Room
from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from app.models.room import Room


class Hotel(BaseModel):
    __tablename__ = "hotels"

    name: Mapped[str] = mapped_column(
        String(150),
        nullable=False,
    )

    description: Mapped[str] = mapped_column(
        Text,
        nullable=False,
    )

    address: Mapped[str] = mapped_column(
        String(255),
        nullable=False,
    )

    city: Mapped[str] = mapped_column(
        String(100),
        nullable=False,
    )

    district: Mapped[str] = mapped_column(
        String(100),
        nullable=False,
    )

    owner_id: Mapped[int] = mapped_column(
        ForeignKey("users.id"),
        nullable=False,
    )

    owner = relationship(
        "User",
        back_populates="hotels",
    )

    destination_id: Mapped[int] = mapped_column(
        ForeignKey("destinations.id"),
        nullable=False,
    )

    destination: Mapped["Destination"] = relationship(
        "Destination",
        back_populates="hotels",
    )

    rooms: Mapped[list["Room"]] = relationship(
        back_populates="hotel",
        cascade="all, delete-orphan",
    )
