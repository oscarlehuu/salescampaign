"""create campaigns table

Revision ID: ad3fb8d4ac9c
Revises: 4f8cc733163b
Create Date: 2023-05-23 20:57:10.317855

"""
from alembic import op
import sqlalchemy as sa
from datetime import timedelta


# revision identifiers, used by Alembic.
revision = 'ad3fb8d4ac9c'
down_revision = '4f8cc733163b'
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.create_table(
        'CAMPAIGNS',
        sa.Column('id', sa.Integer),
        sa.Column('name', sa.String(255), nullable=False),
        sa.Column('status', sa.String(255), nullable=False, default="Active"),
        sa.Column('start_date', sa.DateTime, server_default=sa.func.current_timestamp()), 
        sa.Column('end_date', sa.DateTime, server_default=sa.text("(DATEADD(day, 14, CAST(GETDATE() AS DATETIME)))"))
    )
    
    campaign_table = sa.table('CAMPAIGNS',
                    sa.column('id', sa.Integer),
                    sa.column('name', sa.String(255)),
                    sa.column('status', sa.String(255)),
                    sa.column('start_date', sa.DateTime), 
                    sa.column('end_date', sa.DateTime))

    op.bulk_insert(
        campaign_table,
            [
                {'id': 1, 'name': 'test campaign', 'status': 'Active'},
            ]
    )

def downgrade() -> None:
    op.drop_table('CAMPAIGNS')
