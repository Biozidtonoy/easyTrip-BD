from datetime import datetime
from pydantic import computed_field
from pydantic import BaseModel, ConfigDict


class DestinationCreate(BaseModel):
    name: str
    description: str
    division: str
    district: str


class DestinationUpdate(BaseModel):
    name: str | None = None
    description: str | None = None
    division: str | None = None
    district: str | None = None


class DestinationResponse(BaseModel):
    id: int
    name: str
    description: str
    division: str
    district: str
    image: str
    created_at: datetime
    updated_at: datetime

    @computed_field
    @property
    def image_url(self) -> str:
        return f"http://127.0.0.1:8000/uploads/destination_images/{self.image}"

    model_config = ConfigDict(from_attributes=True)