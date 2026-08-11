from typing import TYPE_CHECKING

from sqlalchemy import Enum, ForeignKey, String, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.enums.application_status import ApplicationStatus
from app.models.base import BaseModel

if TYPE_CHECKING:
    from app.models.user import User


class HotelOwnerApplication(BaseModel):
    __tablename__ = "hotel_owner_applications"

    user_id: Mapped[int] = mapped_column(
        ForeignKey("users.id"),
        nullable=False,
        index=True,
    )

    hotel_name: Mapped[str] = mapped_column(
        String(150),
        nullable=False,
    )

    business_email: Mapped[str] = mapped_column(
        String(255),
        nullable=False,
    )

    phone: Mapped[str] = mapped_column(
        String(20),
        nullable=False,
    )

    address: Mapped[str] = mapped_column(
        String(255),
        nullable=False,
    )

    district: Mapped[str] = mapped_column(
        String(100),
        nullable=False,
    )

    trade_license_number: Mapped[str] = mapped_column(
        String(100),
        nullable=False,
    )

    hotel_description: Mapped[str] = mapped_column(
        Text,
        nullable=False,
    )

    website: Mapped[str | None] = mapped_column(
        String(255),
        nullable=True,
    )

    logo: Mapped[str | None] = mapped_column(
        String(500),
        nullable=True,
    )

    trade_license_document: Mapped[str] = mapped_column(
        String(500),
        nullable=False,
    )

    status: Mapped[ApplicationStatus] = mapped_column(
        Enum(ApplicationStatus),
        default=ApplicationStatus.PENDING,
        nullable=False,
    )

    applicant: Mapped["User"] = relationship(
        back_populates="hotel_owner_applications",
    )