from fastapi import APIRouter, Header, HTTPException, Depends
from models.shorturl import shortUrl, updateBatchShort
from middleware.user import validateApi
from middleware.shorturl import createShortUseCase, deleteShortUseCase, updateShortUseCase, retrieveShortUseCase

url_router = APIRouter()


def validate_api_key(Authorization: str = Header(...)):
    userId = validateApi(api_key=Authorization)
    print('Authorization successful', userId)

    if not userId:
        raise HTTPException(status_code=401, detail='Invalid API Key')
    return userId


@url_router.get('')
def fetch_all_short(userId: str = Depends(validate_api_key)):
    response = retrieveShortUseCase(user_id=userId)
    return response

@url_router.post('')
def buildShort(url_info: shortUrl, userId: str = Depends(validate_api_key)):
    data = url_info.model_dump()['source']
    response = createShortUseCase(short_url_list=data, user_id=userId)
    return response

@url_router.post('/userfree')
def short_without_user(url_info: shortUrl):
    data = url_info.model_dump()
    data = data['source']
    response = createShortUseCase(short_url_list=data)
    return response

@url_router.put('')
def updateShort(url_info: updateBatchShort, userId: str = Depends(validate_api_key)):
    data = url_info.model_dump().get('shortlist')
    response = updateShortUseCase(short_url_list=data, user_id=userId)
    return response


@url_router.delete('/{urlid}')
def deleteShort(urlid: str, userId: str = Depends(validate_api_key)):
    response = deleteShortUseCase(short_url_id=urlid, user_id=userId)
    return response

@url_router.get('/{urlid}')
def retrieveShort(urlid: str, userId: str = Depends(validate_api_key)):
    response = retrieveShortUseCase(short_id=urlid, user_id=userId)
    return response