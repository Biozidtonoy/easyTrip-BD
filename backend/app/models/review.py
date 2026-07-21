from sqlalchemy import ForeignKey, Integer, Text, UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.models.base import BaseModel
from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from app.models.hotel import Hotel
    from app.models.user import User

class Review(BaseModel):
    __tablename__ = "reviews"

    __table_args__ = (
        UniqueConstraint(
            "traveler_id",
            "hotel_id",
            name="uq_traveler_hotel_review",
        ),
    )
    
    traveler_id: Mapped[int] = mapped_column(
        ForeignKey("users.id"),
        nullable=False,
    )

    hotel_id: Mapped[int] = mapped_column(
        ForeignKey("hotels.id"),
        nullable=False,
    )

    rating: Mapped[int] = mapped_column(
        Integer,
        nullable=False,
    )

    comment: Mapped[str | None] = mapped_column(
        Text,
        nullable=True,
    )

    traveler: Mapped["User"] = relationship(
        back_populates="reviews",
    )

    hotel: Mapped["Hotel"] = relationship(
        back_populates="reviews",
    )