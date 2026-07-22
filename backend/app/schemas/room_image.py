from pydantic import BaseModel, ConfigDict, computed_field


class RoomImageResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    room_id: int
    image: str

    @computed_field
    @property
    def image_url(self) -> str:
        return f"http://127.0.0.1:8000/uploads/room_images/{self.image}"