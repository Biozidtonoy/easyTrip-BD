from sqlalchemy.orm import Session

from app.models.user import User
from app.schemas.user import UserCreate
from app.enums.user_role import UserRole

def get_user_by_email(db: Session, email: str) -> User | None:
    return db.query(User).filter(User.email == email).first()


def create_user(db: Session,user_data: UserCreate,hashed_password: str,) -> User:
    user = User(
        name=user_data.name,
        email=user_data.email,
        hashed_password=hashed_password,
        role=UserRole.TRAVELER,
    )

    db.add(user)
    db.commit()
    db.refresh(user)

    return user