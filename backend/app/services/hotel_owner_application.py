from fastapi import HTTPException, UploadFile, status
from sqlalchemy.orm import Session

from app.crud.hotel_owner_application import (
    create_hotel_owner_application,
    get_pending_application_by_user_id,
)
from app.enums.user_role import UserRole
from app.models.user import User
from app.schemas.hotel_owner_application import (
    HotelOwnerApplicationCreate,
)
from app.utils.file_upload import save_image


def create_hotel_owner_application_service(
    db: Session,
    application_data: HotelOwnerApplicationCreate,
    current_user: User,
    logo: UploadFile | None,
    trade_license_document: UploadFile,
):
    # 1. Only travelers can apply
    if current_user.role != UserRole.TRAVELER:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail=(
                "Only travelers can apply "
                "to become hotel owners."
            ),
        )

    # 2. Prevent duplicate pending applications
    existing_application = (
        get_pending_application_by_user_id(
            db,
            current_user.id,
        )
    )

    if existing_application is not None:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=(
                "You already have a pending "
                "hotel owner application."
            ),
        )

    # 3. Upload trade license document
    trade_license_document_url = save_image(
        trade_license_document,
        "trade_license_documents",
    )

    # 4. Upload logo if provided
    logo_url = None

    if logo is not None:
        logo_url = save_image(
            logo,
            "hotel_owner_logos",
        )

    # 5. Create application
    return create_hotel_owner_application(
        db=db,
        user_id=current_user.id,
        hotel_name=application_data.hotel_name,
        business_email=application_data.business_email,
        phone=application_data.phone,
        address=application_data.address,
        district=application_data.district,
        trade_license_number=(
            application_data.trade_license_number
        ),
        hotel_description=(
            application_data.hotel_description
        ),
        website=application_data.website,
        logo=logo_url,
        trade_license_document=(
            trade_license_document_url
        ),
    )