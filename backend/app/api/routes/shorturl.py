from fastapi import APIRouter, Depends, HTTPException, status, Request
from fastapi.responses import RedirectResponse
from app.models import ShortUrl
from app import constants
from sqlmodel import Session
from app.services.short_url import shortUrlService
from app.core.db import get_session
from app.models import clickAnalytics
from app.core.validate import validate_api_key


url_router = APIRouter(tags=['shortUrl API'])
url_service = shortUrlService()


@url_router.get('/{short_code}')
def fetch_url(short_code: str, request: Request, session: Session = Depends(get_session)):
    response = url_service.get_original_url(short_code, session)
    if not response:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail='Invalid URL')
    
    # To do: Add click anaylytics report location, 
    url_service.increase_click(response)
    source_url = response.source_url
    return RedirectResponse(source_url)


@url_router.post('/url/createShort')
def create_short_url(short_url: ShortUrl, session: Session = Depends(get_session), user_id: int = Depends(validate_api_key)):
    response = url_service.create_short_url(user_id, short_url, session)
    return {
        'data': {
            'short_id': response.short_id,
            'short_url': f"{constants.BASE_URL}/{response.short_id}",
            'source_url': response.source_url,
            'user_id': response.user_id,
            'timestamp': response.timestamp
        }
    }


@url_router.delete('/url/{short_id}')
def delete_short_url(short_id: str, session: Session = Depends(get_session), user_id: int = Depends(validate_api_key)):
    response = url_service.delete_url(user_id, short_id, session)
    return {'message': response}


@url_router.get('/url/fetchAll')
def fetch_all_short_url(session: Session = Depends(get_session), user_id: int = Depends(validate_api_key)):
    print('user id is', user_id)
    short_urls = url_service.get_all_url(user_id, session)

    mapped_short_urls = []

    for url in short_urls:
        mapped_short_urls.append({
            'short_id': url.short_id,
            'short_url': f"{constants.BASE_URL}/{url.short_id}",
            'source_url': url.source_url,
            'user_id': url.user_id,
            'timestamp': url.timestamp,
            'total_clicks': url.total_clicks
        })
    return {
        'data': mapped_short_urls
    }
