from datetime import datetime

from fastapi import Form
from pydantic import BaseModel, ConfigDict, EmailStr, Field

from app.enums.application_status import ApplicationStatus


class HotelOwnerApplicationCreate(BaseModel):
    hotel_name: str = Field(
        min_length=2,
        max_length=150,
        examples=["Sonargaon Heritage Resort"],
    )

    business_email: EmailStr = Field(
        examples=["hotel@example.com"],
    )

    phone: str = Field(
        min_length=11,
        max_length=20,
        examples=["01712345678"],
    )

    address: str = Field(
        min_length=5,
        max_length=255,
        examples=["Panam City Road, Sonargaon"],
    )

    district: str = Field(
        min_length=2,
        max_length=100,
        examples=["Narayanganj"],
    )

    trade_license_number: str = Field(
        min_length=3,
        max_length=100,
        examples=["TL-123456789"],
    )

    hotel_description: str = Field(
        min_length=20,
        max_length=2000,
        examples=[
            "A heritage hotel providing comfortable "
            "accommodation and quality hospitality services."
        ],
    )

    website: str | None = Field(
        default=None,
        max_length=255,
        examples=["https://example.com"],
    )

    @classmethod
    def as_form(
        cls,
        hotel_name: str = Form(...),
        business_email: str = Form(...),
        phone: str = Form(...),
        address: str = Form(...),
        district: str = Form(...),
        trade_license_number: str = Form(...),
        hotel_description: str = Form(...),
        website: str | None = Form(None),
    ) -> "HotelOwnerApplicationCreate":

        return cls(
            hotel_name=hotel_name,
            business_email=business_email,
            phone=phone,
            address=address,
            district=district,
            trade_license_number=trade_license_number,
            hotel_description=hotel_description,
            website=website,
        )


class HotelOwnerApplicationResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    user_id: int

    hotel_name: str
    business_email: EmailStr
    phone: str
    address: str
    district: str

    trade_license_number: str
    hotel_description: str

    website: str | None
    logo: str | None
    trade_license_document: str | None

    status: ApplicationStatus
    rejection_reason: str | None
    created_at: datetime
    updated_at: datetime