from fastapi import APIRouter, Depends, Response, HTTPException, status
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.core.security import get_current_user, require_roles
from app.enums.user_role import UserRole
from app.models.user import User
from app.schemas.hotel import (
    HotelCreate,
    HotelUpdate,
    HotelResponse,
)
from app.services.hotel import (
    create_hotel_service,
    get_hotel_service,
    list_hotels_service,
    update_hotel_service,
    delete_hotel_service,
)

router = APIRouter(
    prefix="/hotels",
    tags=["Hotels"],
)


@router.post("",response_model=HotelResponse,status_code=201,)
def create_hotel(
    hotel_data: HotelCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(
        require_roles(UserRole.HOTEL_OWNER)
    ),
):
    return create_hotel_service(
        db,
        hotel_data,
        current_user,
    )


@router.get("",response_model=list[HotelResponse],)
def get_hotels(
    db: Session = Depends(get_db),
):
    return list_hotels_service(db)


@router.get("/{hotel_id}",response_model=HotelResponse,)
def get_hotel(
    hotel_id: int,
    db: Session = Depends(get_db),
):
    return get_hotel_service(
        db,
        hotel_id,
    )


@router.patch("/{hotel_id}",response_model=HotelResponse,)
def update_hotel(
    hotel_id: int,
    hotel_data: HotelUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(
        require_roles(UserRole.HOTEL_OWNER)
    ),
):
    return update_hotel_service(
        db,
        hotel_id,
        hotel_data,
        current_user,
    )


@router.delete("/{hotel_id}",status_code=status.HTTP_204_NO_CONTENT,)
def delete_hotel(hotel_id: int,db: Session = Depends(get_db),current_user: User = Depends(require_roles(UserRole.HOTEL_OWNER)),) -> Response:
    delete_hotel_service(db, hotel_id, current_user)
    return Response(status_code=status.HTTP_204_NO_CONTENT)