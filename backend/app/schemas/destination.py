from datetime import datetime

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
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)