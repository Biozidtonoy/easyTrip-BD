from datetime import datetime

from pydantic import BaseModel, ConfigDict, EmailStr, Field


class UserCreate(BaseModel):
    name: str = Field(
        min_length=2,
        max_length=100,
        examples=["Jhon Doe"],
    )

    email: EmailStr = Field(
        examples=["jhondoe@example.com"],
    )

    password: str = Field(
        min_length=8,
        examples=["StrongPassword123"],
    )


class UserResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    name: str
    email: EmailStr
    is_active: bool
    created_at: datetime
    updated_at: datetime