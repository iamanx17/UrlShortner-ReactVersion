from fastapi import Header, HTTPException, status, Depends
from app.core.db import get_session
from sqlmodel import Session
from app.services.user import UserService

user_service = UserService()


def validate_api_key(session:Session=Depends(get_session), Authorization: str = Header()):
    response = user_service.validate_api_key(Authorization, session)
    if not response:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)

    return response.id
