from fastapi import APIRouter
from app.api.routes.user import user_router
from app.api.routes.shorturl import url_router



router = APIRouter()


router.include_router(user_router)
router.include_router(url_router)