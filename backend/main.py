from fastapi import FastAPI
from routes.user import user_router
from routes.shorturl import url_router
from fastapi.responses import RedirectResponse
from gateways.shorturl import shorturlBaseGateway
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(user_router, prefix="/user", tags=["User"])
app.include_router(url_router, prefix="/shorturl", tags=["urlShortner"])


@app.get("/")
def read_root():
    return {"message": "Welcome to UrlShortner app"}


@app.get("/{short_id}")
def redirect_to_source(short_id: str):
    fetch_source_url = shorturlBaseGateway.retrieve_by_short_id(short_id)
    if fetch_source_url:
        return RedirectResponse(url=fetch_source_url, status_code=302)

    return {'message': 'No Such shortUrl found'}
