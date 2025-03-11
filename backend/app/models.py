from sqlmodel import SQLModel, Field, Relationship
from typing import Optional, List
from pydantic import EmailStr
import secrets
import uuid
from datetime import datetime


class User(SQLModel, table=True):
    id: Optional[int] | None = Field(default=None, primary_key=True)
    first_name: Optional[str]
    last_name: Optional[str]
    email: EmailStr = Field(unique=True, index=True)
    password: Optional[str]
    timestamp: Optional[datetime] = Field(default_factory=datetime.utcnow)
    api_key: Optional[str] = Field(default_factory=lambda: str(uuid.uuid4())) 
    shorturls: Optional[List["ShortUrl"]] = Relationship(back_populates='user', cascade_delete=True)


class ShortUrl(SQLModel, table=True):
    id: Optional[int] | None = Field(default=None, primary_key=True)
    source_url: str
    short_id: Optional[str]= Field(default_factory=lambda: secrets.token_urlsafe(6), index=True)
    timestamp: Optional[datetime] = Field(default_factory=datetime.utcnow)
    user_id: Optional[int] = Field(foreign_key='user.id')
    total_clicks: Optional[int] | 0
    user: User = Relationship(back_populates='shorturls')
    clicks_report: Optional[List['clickAnalytics']] = Relationship(back_populates='short_url', cascade_delete=True)

class clickAnalytics(SQLModel, table=True):
    id : Optional[int] | None = Field(default=None, primary_key=True)
    short_id : int = Field(foreign_key='shorturl.id')
    timestamp: Optional[datetime] = Field(default_factory=datetime.utcnow)
    ip_address: Optional[str] | None
    country: Optional[str] | None
    city: Optional[str] | None
    browser: Optional[str] | None
    os: Optional[str] | None
    device_type: Optional[str] | None

    short_url : ShortUrl = Relationship(back_populates='clicks_report')


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

