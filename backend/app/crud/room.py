from sqlalchemy.orm import Session

from app.models.room import Room
from app.schemas.room import RoomCreate


def create_room(
    db: Session,
    room_data: RoomCreate,
) -> Room:
    room = Room(
        **room_data.model_dump(),
    )

    db.add(room)
    db.commit()
    db.refresh(room)

    return room


def get_room_by_id(
    db: Session,
    room_id: int,
) -> Room | None:
    return db.query(Room).filter(Room.id == room_id).first()


def get_rooms(
    db: Session,
) -> list[Room]:
    return db.query(Room).all()


from app.schemas.room import RoomUpdate


def update_room(
    db: Session,
    room: Room,
    room_data: RoomUpdate,
) -> Room:
    update_data = room_data.model_dump(exclude_unset=True)

    for field, value in update_data.items():
        setattr(room, field, value)

    db.commit()
    db.refresh(room)

    return room


def delete_room(
    db: Session,
    room: Room,
) -> None:
    db.delete(room)
    db.commit()

def get_room_by_number(
    db: Session,
    hotel_id: int,
    room_number: str,
) -> Room | None:
    return (
        db.query(Room)
        .filter(
            Room.hotel_id == hotel_id,
            Room.room_number == room_number,
        )
        .first()
    )

def get_room_by_number_except_current(
    db: Session,
    hotel_id: int,
    room_number: str,
    room_id: int,
) -> Room | None:
    return (
        db.query(Room)
        .filter(
            Room.hotel_id == hotel_id,
            Room.room_number == room_number,
            Room.id != room_id,
        )
        .first()
    )