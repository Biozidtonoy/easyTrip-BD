"""add user role

Revision ID: c5ad5fd4ec81
Revises: 4dcb0d4d3e86
Create Date: 2026-07-19 18:24:48.944062

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'c5ad5fd4ec81'
down_revision: Union[str, Sequence[str], None] = '4dcb0d4d3e86'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""

    user_role = sa.Enum(
        "TRAVELER",
        "HOTEL_OWNER",
        "ADMIN",
        name="userrole",
    )

    # Create PostgreSQL enum type
    user_role.create(op.get_bind(), checkfirst=True)

    # Add column
    op.add_column(
        "users",
        sa.Column(
            "role",
            user_role,
            nullable=False,
            server_default="TRAVELER",
        ),
    )


def downgrade() -> None:
    """Downgrade schema."""

    op.drop_column("users", "role")

    user_role = sa.Enum(
        "TRAVELER",
        "HOTEL_OWNER",
        "ADMIN",
        name="userrole",
    )

    user_role.drop(op.get_bind(), checkfirst=True)
