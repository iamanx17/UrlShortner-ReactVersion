from fastapi import FastAPI
from app.api.main import router
from app.core.db import init_db



init_db()
app = FastAPI(title='urlShortner App', description='Welcome to urlshortner APIs', version='1.0')
app.include_router(router)