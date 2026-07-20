from fastapi import APIRouter, Depends, Response, status
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.core.security import require_roles
from app.enums.user_role import UserRole
from app.schemas.destination import (
    DestinationCreate,
    DestinationUpdate,
    DestinationResponse,
)
from app.services.destination import (
    create_destination_service,
    get_destination_service,
    list_destinations_service,
    update_destination_service,
    delete_destination_service,
)

router = APIRouter(
    prefix="/destinations",
    tags=["Destinations"],
)


@router.post(
    "",
    response_model=DestinationResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_destination(
    destination_data: DestinationCreate,
    db: Session = Depends(get_db),
    current_user=Depends(require_roles(UserRole.ADMIN)),
):
    return create_destination_service(
        db=db,
        destination_data=destination_data,
    )


@router.get(
    "",
    response_model=list[DestinationResponse],
)
def get_destinations(
    db: Session = Depends(get_db),
):
    return list_destinations_service(db)


@router.get(
    "/{destination_id}",
    response_model=DestinationResponse,
)
def get_destination(
    destination_id: int,
    db: Session = Depends(get_db),
):
    return get_destination_service(
        db=db,
        destination_id=destination_id,
    )


@router.patch(
    "/{destination_id}",
    response_model=DestinationResponse,
)
def update_destination(
    destination_id: int,
    destination_data: DestinationUpdate,
    db: Session = Depends(get_db),
    current_user=Depends(require_roles(UserRole.ADMIN)),
):
    return update_destination_service(
        db=db,
        destination_id=destination_id,
        destination_data=destination_data,
    )


@router.delete(
    "/{destination_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
def delete_destination(
    destination_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(require_roles(UserRole.ADMIN)),
) -> Response:
    delete_destination_service(
        db=db,
        destination_id=destination_id,
    )

    return Response(
        status_code=status.HTTP_204_NO_CONTENT
    )