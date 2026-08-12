from fastapi import APIRouter, Depends, File, UploadFile
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.core.security import require_roles
from app.enums.user_role import UserRole
from app.models.user import User
from app.schemas.room_image import RoomImageResponse
from app.services.room_image import (
    upload_room_image_service,
    delete_room_image_service,
    update_room_image_service,
)


router = APIRouter(
    prefix="/rooms",
    tags=["Room Images"],
)


@router.post(
    "/{room_id}/images",
    response_model=RoomImageResponse,
    status_code=201,
)
def upload_room_image(
    room_id: int,
    image: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(
        require_roles(UserRole.HOTEL_OWNER)
    ),
):

    return upload_room_image_service(
        db=db,
        room_id=room_id,
        image=image,
        current_user=current_user,
    )

@router.put(
    "/{room_id}/images/{image_id}",
    response_model=RoomImageResponse,
)
def update_room_image(
    room_id: int,
    image_id: int,
    image: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(
        require_roles(UserRole.HOTEL_OWNER)
    ),
):

    return update_room_image_service(
        db=db,
        room_id=room_id,
        image_id=image_id,
        image=image,
        current_user=current_user,
    )


@router.delete(
    "/{room_id}/images/{image_id}",
    status_code=204,
)
def delete_room_image(
    room_id: int,
    image_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(
        require_roles(UserRole.HOTEL_OWNER)
    ),
):

    delete_room_image_service(
        db=db,
        room_id=room_id,
        image_id=image_id,
        current_user=current_user,
    )