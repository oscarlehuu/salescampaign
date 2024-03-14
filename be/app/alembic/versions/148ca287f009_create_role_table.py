"""create role table

Revision ID: 148ca287f009
Revises: 
Create Date: 2023-05-23 04:22:35.443011

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '148ca287f009'
down_revision = None
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.create_table(
        'ROLES',
        sa.Column('id', sa.Integer, primary_key=True),
        sa.Column('name', sa.String(255), nullable=False)
    )

    role_table = sa.table('ROLES',
                    sa.column('id', sa.Integer),
                    sa.column('name', sa.String(255)))

    op.bulk_insert(
        role_table,
            [
                {'name': 'admin'},
                {'name': 'user'}
            ]
    )


def downgrade() -> None:
    op.drop_table('ROLES')
