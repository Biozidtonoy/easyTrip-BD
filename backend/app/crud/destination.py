from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.destination import Destination
from app.schemas.destination import (
    DestinationCreate,
    DestinationUpdate,
)


def create_destination(
    db: Session,
    destination_data: DestinationCreate,
) -> Destination:
    destination = Destination(
        **destination_data.model_dump()
    )

    db.add(destination)
    db.commit()
    db.refresh(destination)

    return destination


def get_destination_by_id(
    db: Session,
    destination_id: int,
) -> Destination | None:
    statement = select(Destination).where(
        Destination.id == destination_id
    )

    return db.scalar(statement)


def get_destinations(
    db: Session,
) -> list[Destination]:
    statement = select(Destination)

    return list(db.scalars(statement).all())


def update_destination(
    db: Session,
    destination: Destination,
    destination_data: DestinationUpdate,
) -> Destination:
    update_data = destination_data.model_dump(
        exclude_unset=True
    )

    for field, value in update_data.items():
        setattr(destination, field, value)

    db.commit()
    db.refresh(destination)

    return destination


def delete_destination(
    db: Session,
    destination: Destination,
) -> None:
    db.delete(destination)
    db.commit()