from fastapi import HTTPException, UploadFile, status
from sqlalchemy.orm import Session

from app.crud.room import get_room_by_id
from app.crud.room_image import (
    create_room_image,
    delete_room_image,
    get_room_image_by_id,
    update_room_image,
)
from app.models.user import User
from app.utils.file_upload import (
    delete_image,
    save_image,
)


def upload_room_image_service(
    db: Session,
    room_id: int,
    image: UploadFile,
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

    if room.hotel.owner_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You can only manage images for rooms in your own hotels.",
        )

    image_url = save_image(
        image,
        "room_images",
    )

    return create_room_image(
        db=db,
        room_id=room_id,
        image=image_url,
    )


def delete_room_image_service(
    db: Session,
    room_id: int,
    image_id: int,
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

    if room.hotel.owner_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You can only manage images for rooms in your own hotels.",
        )

    room_image = get_room_image_by_id(
        db,
        image_id,
    )

    if room_image is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Room image not found.",
        )

    if room_image.room_id != room_id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="This image does not belong to this room.",
        )

    delete_image(
        room_image.image,
    )

    delete_room_image(
        db,
        room_image,
    )


def update_room_image_service(
    db: Session,
    room_id: int,
    image_id: int,
    image: UploadFile,
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

    if room.hotel.owner_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You can only manage images for rooms in your own hotels.",
        )

    room_image = get_room_image_by_id(
        db,
        image_id,
    )

    if room_image is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Room image not found.",
        )

    if room_image.room_id != room_id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="This image does not belong to this room.",
        )

    # Upload the new image first.
    new_image_url = save_image(
        image,
        "room_images",
    )

    # Delete the old Cloudinary image.
    delete_image(
        room_image.image,
    )

    # Update the existing database record.
    return update_room_image(
        db=db,
        room_image=room_image,
        image=new_image_url,
    )