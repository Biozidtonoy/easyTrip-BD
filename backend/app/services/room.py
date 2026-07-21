from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.crud.hotel import get_hotel_by_id
from app.crud.room import (
    create_room,
    delete_room,
    get_room_by_id,
    get_room_by_number,
    get_rooms,
    update_room,
    get_room_by_number_except_current,
)
from app.models.user import User
from app.schemas.room import RoomCreate, RoomUpdate

def create_room_service(db: Session,room_data: RoomCreate,current_user: User,):
    hotel = get_hotel_by_id(
        db,
        room_data.hotel_id,
    )

    if hotel is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Hotel not found.",
        )

    if hotel.owner_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You can only manage rooms for your own hotels.",
        )
    
    existing_room = get_room_by_number(
        db,
        room_data.hotel_id,
        room_data.room_number,
    )

    if existing_room:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Room number already exists for this hotel.",
        )
    
    return create_room(
        db,
        room_data,
    )


def get_room_service(
    db: Session,
    room_id: int,
):
    room = get_room_by_id(
        db,
        room_id,
    )

    if room is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Room not found.",
        )

    return room


def list_rooms_service(
    db: Session,
):
    return get_rooms(db)

def update_room_service(
    db: Session,
    room_id: int,
    room_data: RoomUpdate,
    current_user: User,
):
    room = get_room_by_id(
        db,
        room_id,
    )

    if room is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Room not found.",
        )

    hotel = get_hotel_by_id(
        db,
        room.hotel_id,
    )

    if hotel.owner_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You can only manage rooms for your own hotels.",
        )

    if room_data.room_number is not None:

        duplicate_room = get_room_by_number_except_current(
            db,
            room.hotel_id,
            room_data.room_number,
            room.id,
        )

        if duplicate_room:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="Room number already exists for this hotel.",
            )

    return update_room(
        db,
        room,
        room_data,
    )


def delete_room_service(
    db: Session,
    room_id: int,
    current_user: User,
):
    room = get_room_by_id(
        db,
        room_id,
    )

    if room is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Room not found.",
        )

    hotel = get_hotel_by_id(
        db,
        room.hotel_id,
    )

    if hotel.owner_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You can only manage rooms for your own hotels.",
        )

    delete_room(
        db,
        room,
    )