from gateways.user import UserGatewayBase, UserRegisterGateway, UserLoginGateway
from fastapi import Header


def createUser(user_data):
    register_gateway = UserRegisterGateway(user_data=user_data)
    user_response = register_gateway.create_user()

    json_response = {
        'success': user_response[0] or False,
        'error': user_response[1] or ''
    }
    return json_response


def loginUser(user_data):
    print(user_data)
    login_gateway = UserLoginGateway(user_data=user_data)
    user_response = login_gateway.login()
    print(user_response)
    if user_response[0]:
        json_response = {
            'success': user_response[0],
            'access_token': user_response[1]
        }
    else:
        json_response = {
            'success': user_response[0],
            'error': user_response[1]
        }

    return json_response


def validateApi(api_key):
    userData = {'apiKey': api_key}
    print(userData)
    try:
        user_gateway = UserGatewayBase(user_data=userData)
        userId = user_gateway.validate_api_key()
        if userId:
            return userId
    except Exception as e:
        print('Some error occured while query', e)
