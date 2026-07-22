from fastapi import APIRouter, Depends, Response, HTTPException, status
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.core.security import get_current_user, require_roles
from app.enums.user_role import UserRole
from app.models.user import User
from app.schemas.review import ReviewResponse
from app.services.review import list_hotel_reviews_service
from fastapi import File, Form, UploadFile
from app.utils.file_upload import save_image


from app.schemas.hotel import (
    HotelCreate,
    HotelUpdate,
    HotelResponse,
)
from app.services.hotel import (
    create_hotel_service,
    get_hotel_service,
    list_hotels_service,
    update_hotel_service,
    delete_hotel_service,
)

router = APIRouter(
    prefix="/hotels",
    tags=["Hotels"],
)


@router.post(
    "",
    response_model=HotelResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_hotel(
    name: str = Form(...),
    description: str = Form(...),
    address: str = Form(...),
    city: str = Form(...),
    district: str = Form(...),
    destination_id: int = Form(...),
    image: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user=Depends(require_roles(UserRole.HOTEL_OWNER)),
):
    hotel_data = HotelCreate(
        name=name,
        description=description,
        address=address,
        city=city,
        district=district,
        destination_id=destination_id,
    )

    return create_hotel_service(
        db=db,
        hotel_data=hotel_data,
        image=image,
        current_user=current_user,
    )


@router.get(
    "",
    response_model=list[HotelResponse],
)
def get_hotels(
    destination_id: int | None = None,
    db: Session = Depends(get_db),
):
    return list_hotels_service(
        db,
        destination_id,
    )


@router.get("/{hotel_id}",response_model=HotelResponse,)
def get_hotel(
    hotel_id: int,
    db: Session = Depends(get_db),
):
    return get_hotel_service(
        db,
        hotel_id,
    )


@router.patch(
    "/{hotel_id}",
    response_model=HotelResponse,
)
def update_hotel(
    hotel_id: int,
    name: str | None = Form(None),
    description: str | None = Form(None),
    address: str | None = Form(None),
    city: str | None = Form(None),
    district: str | None = Form(None),
    destination_id: int | None = Form(None),
    image: UploadFile | None = File(None),
    db: Session = Depends(get_db),
    current_user: User = Depends(
        require_roles(UserRole.HOTEL_OWNER)
    ),
):
    update_data = {}

    if name is not None:
        update_data["name"] = name

    if description is not None:
        update_data["description"] = description

    if address is not None:
        update_data["address"] = address

    if city is not None:
        update_data["city"] = city

    if district is not None:
        update_data["district"] = district

    if destination_id is not None:
        update_data["destination_id"] = destination_id

    hotel_data = HotelUpdate(**update_data)

    return update_hotel_service(
        db=db,
        hotel_id=hotel_id,
        hotel_data=hotel_data,
        current_user=current_user,
        image=image,
    )


@router.delete("/{hotel_id}",status_code=status.HTTP_204_NO_CONTENT,)
def delete_hotel(hotel_id: int,db: Session = Depends(get_db),current_user: User = Depends(require_roles(UserRole.HOTEL_OWNER)),) -> Response:
    delete_hotel_service(db, hotel_id, current_user)
    return Response(status_code=status.HTTP_204_NO_CONTENT)

@router.get(
    "/{hotel_id}/reviews",
    response_model=list[ReviewResponse],
)
def get_hotel_reviews(
    hotel_id: int,
    db: Session = Depends(get_db),
):
    return list_hotel_reviews_service(
        db,
        hotel_id,
    )