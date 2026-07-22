from decimal import Decimal
from pydantic import BaseModel
from app.enums.room_type import RoomType
from datetime import datetime
from app.schemas.room_image import RoomImageResponse


class RoomCreate(BaseModel):
    hotel_id: int
    room_number: str
    room_type: RoomType
    price_per_night: Decimal
    capacity: int

class RoomUpdate(BaseModel):
    room_number: str | None = None
    room_type: RoomType | None = None
    price_per_night: Decimal | None = None
    capacity: int | None = None
    is_available: bool | None = None

class RoomResponse(BaseModel):
    id: int
    hotel_id: int
    room_number: str
    room_type: RoomType
    price_per_night: Decimal
    capacity: int
    images: list[RoomImageResponse] = []
    is_available: bool
    created_at: datetime
    updated_at: datetime

    model_config = {"from_attributes": True}