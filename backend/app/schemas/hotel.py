from datetime import datetime

from pydantic import BaseModel, ConfigDict


class HotelCreate(BaseModel):
    name: str
    description: str
    address: str
    city: str
    district: str
    destination_id: int


class HotelUpdate(BaseModel):
    name: str | None = None
    description: str | None = None
    address: str | None = None
    city: str | None = None
    district: str | None = None
    destination_id: int | None = None

class HotelResponse(BaseModel):
    id: int
    name: str
    description: str
    address: str
    city: str
    district: str
    owner_id: int
    destination_id: int
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)