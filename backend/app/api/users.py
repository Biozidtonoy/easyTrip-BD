from fastapi import APIRouter
from fastapi import Depends

from app.core.security import get_current_user
from app.models.user import User
from app.schemas.user import UserResponse
from app.core.security import require_roles
from app.enums.user_role import UserRole

router = APIRouter(
    prefix="/users",
    tags=["Users"],
)

@router.get("/me",response_model=UserResponse,)
def read_current_user(current_user: User = Depends(get_current_user),):
    return current_user

@router.get("/admin-test")
def admin_test(
    current_user: User = Depends(
        require_roles(UserRole.ADMIN)
    ),
):
    return {
        "message": "Welcome Admin!",
        "user": current_user.name,
        "role": current_user.role,
    }