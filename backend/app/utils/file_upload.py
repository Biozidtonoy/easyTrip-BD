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

import cloudinary
from cloudinary.uploader import upload, destroy
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


def delete_image(
    image_url: str,
) -> None:

    try:
        upload_marker = "/upload/"

        if upload_marker not in image_url:
            raise ValueError("Invalid Cloudinary image URL.")

        image_path = image_url.split(
            upload_marker,
            1,
        )[1]

        # Remove version from the path.
        # Example:
        # v1786549886/easytrip/room_images/image.jpg
        # becomes:
        # easytrip/room_images/image.jpg
        parts = image_path.split("/", 1)

        if len(parts) != 2:
            raise ValueError("Invalid Cloudinary image URL.")

        public_id_with_extension = parts[1]

        # Remove file extension.
        public_id = public_id_with_extension.rsplit(
            ".",
            1,
        )[0]

        result = destroy(
            public_id,
            resource_type="image",
            type="upload",
        )

        if result.get("result") not in {
            "ok",
            "not found",
        }:
            raise Exception(
                "Cloudinary failed to delete the image."
            )

    except Exception:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to delete image.",
        )