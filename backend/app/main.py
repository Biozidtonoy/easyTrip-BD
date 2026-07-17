from fastapi import FastAPI
from contextlib import asynccontextmanager
from fastapi import FastAPI
from sqlalchemy import text

from app.db.database import engine

# @asynccontextmanager
# async def lifespan(app: FastAPI):
#     try:
#         with engine.connect() as connection:
#             connection.execute(text("SELECT 1"))
#         print("✅ Successfully connected to PostgreSQL.")
#     except Exception as e:
#         print(f"❌ Failed to connect to PostgreSQL: {e}")
#         raise
#     yield

# lifespan=lifespan

app = FastAPI()

@app.get("/")
def root():
    return {"message": "easytrip-bd"}