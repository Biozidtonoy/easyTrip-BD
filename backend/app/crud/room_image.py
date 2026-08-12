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

from sqlalchemy import select
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


def get_room_image_by_id(
    db: Session,
    image_id: int,
) -> RoomImage | None:

    return db.scalar(
        select(RoomImage).where(
            RoomImage.id == image_id
        )
    )



def update_room_image(
    db: Session,
    room_image: RoomImage,
    image: str,
) -> RoomImage:

    room_image.image = image

    db.commit()
    db.refresh(room_image)

    return room_image



def delete_room_image(
    db: Session,
    room_image: RoomImage,
) -> None:

    db.delete(room_image)
    db.commit()

