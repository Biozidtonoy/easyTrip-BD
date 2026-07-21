from fastapi import FastAPI
# from contextlib import asynccontextmanager
# from sqlalchemy import text

from app.db.database import engine
from app.api.auth import router as auth_router
from app.api.users import router as users_router
from app.api.hotels import router as hotel_router
from app.api.destinations import router as destination_router
from app.api.rooms import router as room_router
from app.api.bookings import router as booking_router
from app.api.reviews import router as review_router
app = FastAPI()
app.include_router(auth_router)
app.include_router(users_router)
app.include_router(hotel_router)
app.include_router(destination_router)
app.include_router(room_router)
app.include_router(booking_router)
app.include_router(review_router)

@app.get("/")
def root():
    return {"message": "welcome to easytrip-bd backend service"}