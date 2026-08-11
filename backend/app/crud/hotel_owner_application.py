from sqlalchemy import select
from sqlalchemy.orm import Session

from app.enums.application_status import ApplicationStatus
from app.models.hotel_owner_application import HotelOwnerApplication


def create_hotel_owner_application(
    db: Session,
    user_id: int,
    hotel_name: str,
    business_email: str,
    phone: str,
    address: str,
    district: str,
    trade_license_number: str,
    hotel_description: str,
    website: str | None = None,
    logo: str | None = None,
    trade_license_document: str | None = None,
) -> HotelOwnerApplication:

    application = HotelOwnerApplication(
        user_id=user_id,
        hotel_name=hotel_name,
        business_email=business_email,
        phone=phone,
        address=address,
        district=district,
        trade_license_number=trade_license_number,
        hotel_description=hotel_description,
        website=website,
        logo=logo,
        trade_license_document=trade_license_document,
        status=ApplicationStatus.PENDING,
    )

    db.add(application)
    db.commit()
    db.refresh(application)

    return application


def get_application_by_id(
    db: Session,
    application_id: int,
) -> HotelOwnerApplication | None:

    return db.scalar(
        select(HotelOwnerApplication).where(
            HotelOwnerApplication.id == application_id
        )
    )


def get_application_by_user_id(
    db: Session,
    user_id: int,
) -> HotelOwnerApplication | None:

    return db.scalar(
        select(HotelOwnerApplication).where(
            HotelOwnerApplication.user_id == user_id
        )
    )


def get_pending_application_by_user_id(
    db: Session,
    user_id: int,
) -> HotelOwnerApplication | None:

    return db.scalar(
        select(HotelOwnerApplication).where(
            HotelOwnerApplication.user_id == user_id,
            HotelOwnerApplication.status
            == ApplicationStatus.PENDING,
        )
    )


def get_applications(
    db: Session,
) -> list[HotelOwnerApplication]:

    return list(
        db.scalars(
            select(HotelOwnerApplication)
        ).all()
    )

def update_application_status(
    db: Session,
    application: HotelOwnerApplication,
    status: ApplicationStatus,
) -> HotelOwnerApplication:

    application.status = status

    db.commit()
    db.refresh(application)

    return application

def reject_application(
    db: Session,
    application: HotelOwnerApplication,
    rejection_reason: str,
) -> HotelOwnerApplication:

    application.status = ApplicationStatus.REJECTED
    application.rejection_reason = rejection_reason

    db.commit()
    db.refresh(application)

    return application