from fastapi import APIRouter, Depends, File, UploadFile, status
from sqlalchemy.orm import Session

from app.core.security import get_current_user
from app.db.database import get_db
from app.models.user import User
from app.schemas.hotel_owner_application import (
    HotelOwnerApplicationCreate,
    HotelOwnerApplicationResponse,
)
from app.services.hotel_owner_application import (
    create_hotel_owner_application_service,
)


router = APIRouter(
    prefix="/hotel-owner-applications",
    tags=["Hotel Owner Applications"],
)


@router.post(
    "",
    response_model=HotelOwnerApplicationResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_hotel_owner_application(
    application_data: HotelOwnerApplicationCreate = Depends(
        HotelOwnerApplicationCreate.as_form
    ),
    logo: UploadFile | None = File(None),
    trade_license_document: UploadFile = File(...),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    return create_hotel_owner_application_service(
        db=db,
        application_data=application_data,
        current_user=current_user,
        logo=logo,
        trade_license_document=trade_license_document,
    )