from fastapi import HTTPException, status
from sqlalchemy.orm import Session
from fastapi import UploadFile
from app.utils.file_upload import save_image
from app.crud.hotel import create_hotel, get_hotel_by_id, update_hotel, get_hotels,delete_hotel
from app.enums.user_role import UserRole
from app.models.user import User
from app.schemas.hotel import HotelCreate, HotelUpdate
from app.crud.destination import get_destination_by_id

def create_hotel_service(
    db: Session,
    hotel_data: HotelCreate,
    image: UploadFile,
    current_user: User,
):
    if current_user.role != UserRole.HOTEL_OWNER:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only hotel owners can create hotels.",
        )

    destination = get_destination_by_id(
        db,
        hotel_data.destination_id,
    )

    if destination is None:
        raise HTTPException(
        status_code=404,
        detail="Destination not found.",
    )
    image_filename = save_image(
        image,
        "hotel_images",
    )
    return create_hotel(
        db=db,
        hotel_data=hotel_data,
        owner_id=current_user.id,
        image=image_filename,
    )


def get_hotel_service(
    db: Session,
    hotel_id: int,
):
    hotel = get_hotel_by_id(db, hotel_id)

    if hotel is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Hotel not found.",
        )

    return hotel

from app.crud.hotel import get_hotels


def list_hotels_service(
    db: Session,
):
    return get_hotels(db)


def update_hotel_service(
    db: Session,
    hotel_id: int,
    hotel_data: HotelUpdate,
    current_user: User,
):
    hotel = get_hotel_by_id(db, hotel_id)

    if hotel is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Hotel not found.",
        )

    if hotel.owner_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You can only update your own hotels.",
        )

    if hotel_data.destination_id is not None:
        destination = get_destination_by_id(
            db,
            hotel_data.destination_id,
        )

        if destination is None:
            raise HTTPException(
                status_code=404,
                detail="Destination not found.",
            )
    return update_hotel(
        db,
        hotel,
        hotel_data,
    )


def delete_hotel_service(
    db: Session,
    hotel_id: int,
    current_user: User,
):
    hotel = get_hotel_by_id(db, hotel_id)

    if hotel is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Hotel not found.",
        )

    if hotel.owner_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You can only delete your own hotels.",
        )

    delete_hotel(
        db,
        hotel,
    )
