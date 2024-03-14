"""create user table

Revision ID: 4f8cc733163b
Revises: 148ca287f009
Create Date: 2023-05-23 04:31:27.122393

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '4f8cc733163b'
down_revision = '148ca287f009'
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.create_table(
        'USERS',
        sa.Column('id', sa.Integer, primary_key=True, autoincrement=True),
        sa.Column('created_date', sa.DateTime, nullable=False, server_default=sa.func.current_timestamp()),
        sa.Column('full_name', sa.String(255), nullable=False),
        sa.Column('email', sa.String(255), nullable=False),
        sa.Column('crm_platform_account_id', sa.String(255), nullable=False),
        sa.Column('crm_platform_account_code', sa.String(255), nullable=False),
        sa.Column('password', sa.String(255), nullable=False),
        sa.Column('role_id', sa.String(255), nullable=False)
    )
    
    user_table = sa.table('USERS',
                    sa.column('id', sa.Integer),
                    sa.column('full_name', sa.String(255)),
                    sa.column('email', sa.String(255)),
                    sa.column('crm_platform_account_id', sa.String(255)),
                    sa.column('crm_platform_account_code', sa.String(255)),
                    sa.column('password', sa.String(255)),
                    sa.column('role_id', sa.String(255)),
                    sa.column('created_date', sa.DateTime))

    op.bulk_insert(
        user_table,
            [
                {
                    'email': 'testemail@gmail.com', 
                    'full_name': 'test123', 
                    'crm_platform_account_code': 'TEST123', 
                    'crm_platform_account_id': '1234', 
                    'role_id': 1,
                    'password': '$2b$12$psZbvlgM08/WWF7/FtOTeOkt8p2LcOu/ToHy2vSpxvE4p.7lclN7.'
                }
            ]
    )


def downgrade() -> None:
    op.drop_table('USERS')
