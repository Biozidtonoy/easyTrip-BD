import cloudinary
from cloudinary.uploader import upload
from fastapi import HTTPException, UploadFile, status

from app.core.config import settings


cloudinary.config(
    cloud_name=settings.CLOUDINARY_CLOUD_NAME,
    api_key=settings.CLOUDINARY_API_KEY,
    api_secret=settings.CLOUDINARY_API_SECRET,
    secure=True,
)


ALLOWED_IMAGE_TYPES = {
    "image/jpeg",
    "image/png",
    "image/webp",
}


def save_image(
    image: UploadFile,
    folder: str,
) -> str:

    if image.content_type not in ALLOWED_IMAGE_TYPES:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Only JPEG, PNG, and WebP images are allowed.",
        )

    try:
        result = upload(
            image.file,
            folder=f"easytrip/{folder}",
            resource_type="image",
        )

        return result["secure_url"]

    except Exception:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to upload image.",
        )