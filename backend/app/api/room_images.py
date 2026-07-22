from fastapi import APIRouter, Depends, File, UploadFile
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.schemas.room_image import RoomImageResponse
from app.services.room_image import upload_room_image_service

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
):
    return upload_room_image_service(
        db=db,
        room_id=room_id,
        image=image,
    )