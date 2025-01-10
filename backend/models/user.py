from pydantic import BaseModel, EmailStr
from utils.db import db
from typing import Optional


class UserRegister(BaseModel):
    firstName: Optional[str] = None
    lastName: Optional[str] = None
    email: EmailStr
    apikey: Optional[str] = None    
    password: str
    username: Optional[str] = None



class UserLogin(BaseModel):
    email: str
    password: str


userModel = db['users']