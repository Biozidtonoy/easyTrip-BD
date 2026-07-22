from fastapi import HTTPException, UploadFile, status
from sqlalchemy.orm import Session

from app.crud.room import get_room_by_id
from app.crud.room_image import create_room_image
from app.utils.file_upload import save_image


def upload_room_image_service(
    db: Session,
    room_id: int,
    image: UploadFile,
):
    room = get_room_by_id(db, room_id)

    if room is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Room not found.",
        )

    image_filename = save_image(
        image,
        "room_images",
    )

    return create_room_image(
        db=db,
        room_id=room_id,
        image=image_filename,
    )