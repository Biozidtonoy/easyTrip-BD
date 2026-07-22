from fastapi import HTTPException, status
from sqlalchemy.orm import Session
from fastapi import HTTPException, UploadFile, status

from app.utils.file_upload import save_image

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
    name: str,
    description: str,
    division: str,
    district: str,
    image: UploadFile,
) -> Destination:

    image_filename = save_image(
        image,
        "destination_images",
    )

    destination_data = DestinationCreate(
        name=name,
        description=description,
        division=division,
        district=district,
    )

    return create_destination(
        db=db,
        destination_data=destination_data,
        image=image_filename,
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
    image: UploadFile | None = None,
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

    image_filename = None

    if image is not None:
        image_filename = save_image(
            image,
            "destination_images",
        )

    return update_destination(
        db=db,
        destination=destination,
        destination_data=destination_data,
        image=image_filename,
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