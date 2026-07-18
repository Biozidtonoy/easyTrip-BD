from fastapi import FastAPI
# from contextlib import asynccontextmanager
# from sqlalchemy import text

from app.db.database import engine
from app.api.auth import router as auth_router



app = FastAPI()
app.include_router(auth_router)

@app.get("/")
def root():
    return {"message": "easytrip-bd"}