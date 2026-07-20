from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.crud.destination import (
    create_destination,
    delete_destination,
    get_destination_by_id,
    get_destinations,
    update_destination,
)
from app.models.destination import Destination
from app.models.user import User
from app.schemas.destination import (
    DestinationCreate,
    DestinationUpdate,
)


def create_destination_service(
    db: Session,
    destination_data: DestinationCreate,
) -> Destination:
    return create_destination(
        db=db,
        destination_data=destination_data,
    )


def get_destination_service(
    db: Session,
    destination_id: int,
) -> Destination:
    destination = get_destination_by_id(
        db,
        destination_id,
    )

    if destination is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Destination not found.",
        )

    return destination


def list_destinations_service(
    db: Session,
) -> list[Destination]:
    return get_destinations(db)


def update_destination_service(
    db: Session,
    destination_id: int,
    destination_data: DestinationUpdate,
) -> Destination:
    destination = get_destination_by_id(
        db,
        destination_id,
    )

    if destination is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Destination not found.",
        )

    return update_destination(
        db=db,
        destination=destination,
        destination_data=destination_data,
    )


def delete_destination_service(
    db: Session,
    destination_id: int,
) -> None:
    destination = get_destination_by_id(
        db,
        destination_id,
    )

    if destination is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Destination not found.",
        )

    delete_destination(
        db=db,
        destination=destination,
    )