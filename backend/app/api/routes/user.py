from fastapi import APIRouter, status, HTTPException, Depends
from sqlmodel import Session
from app.core.validate import validate_api_key
from app.core.db import get_session
from app.models import User, LoginUser,UpdateUser
from app.services.user import UserService


user_router = APIRouter(tags=['User API'], prefix='/user')
user_service = UserService()


@user_router.get('/getUser')
def fetch_user(user_id:int = Depends(validate_api_key), session: Session = Depends(get_session)):
    user = user_service.get_user_by_id(user_id, session)

    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='User not found')

    return {
        'data': {
            'first_name': user.first_name,
            'last_name': user.last_name,
            'email': user.email,
            'api_key': user.api_key
        }
    }

@user_router.post('/createUser')
def create_user(user_model: User, session: Session = Depends(get_session)):
    user_dict = user_model.model_dump()
    print('user create request recieved:', user_dict)
    response = user_service.create_user(user=user_model, session=session)
    if not response:
        return {
            'detail': f'User already exists : {user_model.email}'
        }

    else:
        return {
            'detail': f'User is successfully created with the email : {user_model.email}'
        }


@user_router.post('/loginUser')
def login_user(user_model: LoginUser, session: Session = Depends(get_session)):
    status, response = user_service.login_user(user_model, session)
    if not status:
        return {
            'error': response
        }

    else:
        return {
            'message': "login successfully",
            'data': response
        }


@user_router.post('/updateUser')
def update_user(user_model: UpdateUser, session: Session = Depends(get_session), user_id: int = Depends(validate_api_key)):
    status, response = user_service.update_user(user_id,user_model, session)
    if not status:
        return {'error': response}
    else:

        return {'message': 'user has been updated successfully',
                'data': {
                    'first_name': response.first_name,
                    'last_name': response.last_name,
                    'id': response.id
                }}


@user_router.delete('/removeUser')
def delete_user(user_id: int = Depends(validate_api_key), session:Session = Depends(get_session)):
    response = user_service.delete_user(user_id, session)

    return {
        'message': response

    }
