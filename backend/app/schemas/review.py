from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field


class ReviewCreate(BaseModel):
    hotel_id: int
    rating: int = Field(
        ge=1,
        le=5,
        description="Rating must be between 1 and 5",
    )
    comment: str | None = None


class ReviewUpdate(BaseModel):
    rating: int | None = Field(
        default=None,
        ge=1,
        le=5,
        description="Rating must be between 1 and 5",
    )
    comment: str | None = None


class ReviewResponse(BaseModel):
    id: int
    traveler_id: int
    hotel_id: int
    rating: int
    comment: str | None
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)