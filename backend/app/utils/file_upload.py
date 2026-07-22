from pathlib import Path
from uuid import uuid4

import shutil

from fastapi import HTTPException, UploadFile, status

ALLOWED_EXTENSIONS = {
    ".jpg",
    ".jpeg",
    ".png",
    ".webp",
}


def save_image(
    file: UploadFile,
    folder: str,
) -> str:
    extension = Path(file.filename).suffix.lower()

    if extension not in ALLOWED_EXTENSIONS:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Unsupported image format.",
        )

    filename = f"{uuid4()}{extension}"

    upload_dir = Path("uploads") / folder
    upload_dir.mkdir(parents=True, exist_ok=True)

    file_path = upload_dir / filename

    with file_path.open("wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    return filename