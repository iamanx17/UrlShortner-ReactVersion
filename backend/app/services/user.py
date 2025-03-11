from sqlmodel import Session, select
from app.models import User, LoginUser
from pydantic import EmailStr
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


class UserService:
    def hash_password(self, password):
        return pwd_context.hash(password)

    def verify_password(self, plain_password, hashed_password):
        return pwd_context.verify(plain_password, hashed_password)
    
    def validate_api_key(self, api_key:str, session: Session):
        statement = select(User).where(User.api_key == api_key)
        result = session.exec(statement).first()
        return result if result else None

    def get_user_by_email(self, email: EmailStr, session: Session):
        statement = select(User).where(User.email == email)
        result = session.exec(statement).first()
        return result if result else None

    def get_user_by_id(self, user_id: int, session: Session):
        statement = select(User).where(User.id == user_id)
        result = session.exec(statement).first()
        return result if result else None

    def get_user_by_api_key(self, api_key: str, session: Session):
        statement = select(User).where(User.api_key == api_key)
        result = session.exec(statement)
        return result if result else None

    def create_user(self, user: User, session: Session):
        fetch_user = self.get_user_by_email(user.email, session)
        if fetch_user:
            return False

        user.password = self.hash_password(user.password)
        User.model_validate(user)
        session.add(user)
        session.commit()
        return True

    def login_user(self, user_model: LoginUser, session: Session):
        fetch_user = self.get_user_by_email(user_model.email, session)

        if not fetch_user:
            return False, 'User not found'

        if not self.verify_password(user_model.password, fetch_user.password):
            return False, 'Password not matched'

        return True, {
            'api_key': fetch_user.api_key,
            'user_id': fetch_user.id,
            'first_name': fetch_user.first_name,
            'last_name': fetch_user.last_name,
            'email': fetch_user.email
        }
    
    def update_user(self,user_id, user_model, session):
        fetch_user = self.get_user_by_id(user_id, session)
        if not fetch_user:
            False, 'User not found'
        
        fetch_user.first_name = user_model.first_name
        fetch_user.last_name = user_model.last_name
        fetch_user.password = self.hash_password(user_model.password)
        session.add(fetch_user)
        session.commit()
        return True, fetch_user

    def delete_user(self, user_id, session):
        fetch_user = self.get_user_by_id(user_id, session)
        if not fetch_user:
            return 'User not found'
        
        session.delete(fetch_user)
        session.commit()

        return 'Use has been deleted'
