from fastapi import APIRouter
from models.user import UserRegister, UserLogin
from middleware.user import createUser, loginUser


user_router = APIRouter()


@user_router.post('/register')
def register(user: UserRegister):
    user_json = user.model_dump()
    user_created = createUser(user_json)
    if user_created.get('success', False):
        return {
            'success': True,
            'message': 'User has been created successfully!'
        }
    return {
        'success': user_created.get('success'),
        'message': 'User creation failed!!',
        "error": user_created.get('error')
    }


@user_router.post('/login')
def login(user: UserLogin):
    json_response = user.model_dump()
    response = loginUser(json_response)
    return response
    
