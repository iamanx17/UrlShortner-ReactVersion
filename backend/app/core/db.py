from app.models import User, ShortUrl
from app import constants
from sqlmodel import SQLModel, create_engine, Session



engine = create_engine(url=constants.DATABASE_URL, echo=True)



def init_db():
    SQLModel.metadata.create_all(engine)



def get_session():
    with Session(engine) as session:
        yield session