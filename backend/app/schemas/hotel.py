from datetime import datetime
from pydantic import computed_field
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
    image: str
    owner_id: int
    destination_id: int
    created_at: datetime
    updated_at: datetime

    @computed_field
    @property
    def image_url(self) -> str:
        return f"http://127.0.0.1:8000/uploads/hotel_images/{self.image}"
    
    model_config = ConfigDict(from_attributes=True)