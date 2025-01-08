from models.user import userModel
import uuid


class UserGatewayBase:
    def __init__(self, user_data):
        self.user_data = user_data
        self.email = user_data.get('email', None)
        self.userName = user_data.get('username', None)
        self.error = ''
        self.user = None
        self.apiKey = user_data.get('apiKey')

    def validate_api_key(self):
        if not self.apiKey:
            raise ValueError('API Key must not be None')
        try:
            user = userModel.find_one({'apikey': self.apiKey})
            if user:
                return user.get('_id')

        except Exception as e:
            print('Some error occured while query', e)

    def check_email_exists(self):
        if not self.email:
            raise ValueError('Email provided must not be None')

        try:
            user = userModel.find_one({'email': self.email})
            if user:
                self.error = 'Email already exists'
                self.user = user
                return True
        except Exception as e:
            print('Some error occurred while checking email', e)
        return False

    def check_username_exists(self):
        if not self.userName:
            raise ValueError('UserName provided must not be None')
        try:
            user = userModel.find_one({'username': self.userName})
            if user:
                self.error = 'UserName already exists'
                self.user = user
                return True
        except Exception as e:
            print('Some error occurred while checking username', e)
        return False


class UserRegisterGateway(UserGatewayBase):
    def create_user(self):
        if self.check_email_exists() or self.check_username_exists():
            return False, self.error

        self.user_data['apikey'] = str(uuid.uuid4())
        userModel.insert_one(self.user_data)
        return True, self.error


class UserLoginGateway(UserGatewayBase):
    def login(self):
        if not self.check_email_exists():
            self.error = 'Email not exists'
            return False, self.error

        if self.user and self.user.get('password') == self.user_data.get('password'):
            return True, self.user.get('apikey')
        else:
            return False, 'Invalid credentials'
