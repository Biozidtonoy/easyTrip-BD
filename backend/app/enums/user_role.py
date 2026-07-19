from enum import Enum


class UserRole(str, Enum):
    TRAVELER = "traveler"
    HOTEL_OWNER = "hotel_owner"
    ADMIN = "admin"