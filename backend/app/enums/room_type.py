from enum import Enum


class RoomType(str, Enum):
    STANDARD = "STANDARD"
    DELUXE = "DELUXE"
    SUITE = "SUITE"
    FAMILY = "FAMILY"