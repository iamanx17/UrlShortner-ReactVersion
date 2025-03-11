from sqlmodel import SQLModel, Field, Relationship, create_engine, Session, select
from typing import Optional, List
from pydantic import EmailStr, HttpUrl
import secrets
import uuid
from datetime import datetime


class User(SQLModel, table=True):
    id: Optional[int] | None = Field(default=None, primary_key=True)
    first_name: Optional[str]
    last_name: Optional[str]
    email: EmailStr = Field(unique=True, index=True)
    password: Optional[str]
    created_at: Optional[datetime] = Field(default_factory=datetime.utcnow)
    api_key: Optional[str] = Field(default_factory=lambda: str(uuid.uuid4())) 
    shorturls: Optional[List["ShortUrl"]] = Relationship(back_populates='user', cascade_delete=True)


class ShortUrl(SQLModel, table=True):
    id: Optional[int] | None = Field(default=None, primary_key=True)
    source_url: str
    short_id: Optional[str]= Field(default_factory=lambda: secrets.token_urlsafe(6), index=True)
    created_at: Optional[datetime] = Field(default_factory=datetime.utcnow)
    user_id: Optional[int] = Field(foreign_key='user.id')
    user: User = Relationship(back_populates='shorturls')


class LoginUser(SQLModel):
    email: EmailStr
    password: str

class GetUser(SQLModel):
    email: EmailStr

class UpdateUser(SQLModel):
    first_name: Optional[str]
    last_name: Optional[str]
    password: Optional[str]
    email: EmailStr

