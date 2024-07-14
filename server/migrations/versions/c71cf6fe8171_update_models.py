from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision = 'c71cf6fe8171'
down_revision = 'd684305dc24e'
branch_labels = None
depends_on = None

def upgrade():
    with op.batch_alter_table('user') as batch_op:
        batch_op.add_column(sa.Column('email', sa.String(length=120), nullable=False))
        batch_op.add_column(sa.Column('password_hash', sa.String(length=128), nullable=False))
        batch_op.drop_column('password')

def downgrade():
    with op.batch_alter_table('user') as batch_op:
        batch_op.add_column(sa.Column('password', sa.String, nullable=False))
        batch_op.drop_column('email')
        batch_op.drop_column('password_hash')
