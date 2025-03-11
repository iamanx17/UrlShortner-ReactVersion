from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.main import router
from app.core.db import init_db
from app import constants



init_db()
app = FastAPI(title='urlShortner App', description='Welcome to urlshortner APIs', summary='Developed by @iamanx17', version='1.0')
app.add_middleware(CORSMiddleware, allow_origins=constants.ALLOWED_HOSTS, allow_credentials = ['*'], allow_methods=['*'], allow_headers=['*'] )

app.include_router(router)