from sqlmodel import Session, select
from app.models import ShortUrl
from app import constants
from pydantic import HttpUrl


class shortUrlService:
    def create_short_url(self, user_id, short_url: ShortUrl, session: Session):
        print('short url is', short_url)
        short_url.user_id = user_id
        session.add(short_url)
        session.commit()
        return short_url


    def get_original_url(self,short_id:str, session:Session):
        statement = select(ShortUrl).where(ShortUrl.short_id == short_id)
        result = session.exec(statement).first()
        return result if result else None


    def get_url_obj(self, user_id: str, session:Session):
        statement = select(ShortUrl).where(ShortUrl.user_id == user_id)
        results = session.exec(statement)
        return results

    def delete_url(self, user_id, short_id: str, session: Session):
        statement = select(ShortUrl).where((ShortUrl.user_id == user_id) & (ShortUrl.short_id == short_id))
        result = session.exec(statement)
        if not result:
            return 'Short Url Not found'
        
        session.delete(result)
        session.commit()
        return 'Short Url has been deleted'
    
    def get_all_url(self, user_id:str, session: Session):
        short_urls = self.get_url_obj(user_id, session)
        return short_urls
