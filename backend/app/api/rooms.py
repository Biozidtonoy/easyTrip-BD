from sqlalchemy.orm import Session

from fastapi import APIRouter, Depends, status

from app.db.database import get_db
from app.core.security import get_current_user, require_roles
from app.enums.user_role import UserRole
from app.models.user import User
from app.schemas.room import (
    RoomCreate,
    RoomResponse,
    RoomUpdate,
)
from app.services.room import (
    create_room_service,
    delete_room_service,
    get_room_service,
    list_rooms_service,
    update_room_service,
)

router = APIRouter(
    prefix="/rooms",
    tags=["Rooms"],
)

@router.post(
    "",
    response_model=RoomResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_room(
    room_data: RoomCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(
        require_roles(UserRole.HOTEL_OWNER)
    ),
):
    return create_room_service(
        db=db,
        room_data=room_data,
        current_user=current_user,
    )

@router.get(
    "",
    response_model=list[RoomResponse],
)
def get_rooms(
    hotel_id: int | None = None,
    db: Session = Depends(get_db),
):
    return list_rooms_service(
        db,
        hotel_id,
    )

@router.get(
    "/{room_id}",
    response_model=RoomResponse,
)
def get_room(
    room_id: int,
    db: Session = Depends(get_db),
):
    return get_room_service(
        db=db,
        room_id=room_id,
    )

@router.patch(
    "/{room_id}",
    response_model=RoomResponse,
)
def update_room(
    room_id: int,
    room_data: RoomUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(
        require_roles(UserRole.HOTEL_OWNER)
    ),
):
    return update_room_service(
        db=db,
        room_id=room_id,
        room_data=room_data,
        current_user=current_user,
    )

@router.delete(
    "/{room_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
def delete_room(
    room_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(
        require_roles(UserRole.HOTEL_OWNER)
    ),
):
    delete_room_service(
        db=db,
        room_id=room_id,
        current_user=current_user,
    )