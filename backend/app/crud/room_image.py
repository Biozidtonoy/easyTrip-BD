from sqlalchemy.orm import Session

from app.models.room_image import RoomImage


def create_room_image(
    db: Session,
    room_id: int,
    image: str,
) -> RoomImage:
    room_image = RoomImage(
        room_id=room_id,
        image=image,
    )

    db.add(room_image)
    db.commit()
    db.refresh(room_image)

    return room_image