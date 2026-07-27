from pydantic import BaseModel, ConfigDict


class RoomImageResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    
    id: int
    room_id: int
    image: str

