from fastapi import (
    APIRouter,
    Depends,
    File,
    UploadFile,
    status,
)

from sqlalchemy.orm import Session

from app.core.security import get_current_user, require_roles
from app.enums.user_role import UserRole
from app.db.database import get_db
from app.models.user import User
from app.schemas.hotel_owner_application import (
    HotelOwnerApplicationCreate,
    HotelOwnerApplicationResponse,
)
from app.services.hotel_owner_application import (
    create_hotel_owner_application_service,
    get_my_hotel_owner_application_service,
    get_hotel_owner_applications_service,
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


@router.get(
    "/me",
    response_model=HotelOwnerApplicationResponse,
    status_code=status.HTTP_200_OK,
)
def get_my_hotel_owner_application(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    return get_my_hotel_owner_application_service(
        db=db,
        current_user=current_user,
    )


@router.get(
    "",
    response_model=list[HotelOwnerApplicationResponse],
    status_code=status.HTTP_200_OK,
)
def get_hotel_owner_applications(
    current_user: User = Depends(
        require_roles(UserRole.ADMIN)
    ),
    db: Session = Depends(get_db),
):
    return get_hotel_owner_applications_service(
        db=db,
    )