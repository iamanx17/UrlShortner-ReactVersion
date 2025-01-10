from pydantic import BaseModel, HttpUrl
from typing import List, Optional
from utils.db import db



class shortUrl(BaseModel):
    source: List[HttpUrl]

class updateshort(BaseModel):
    source: HttpUrl
    shortId: str

class updateBatchShort(BaseModel):
    shortlist: List[updateshort]
    

urlModel = db['shorturls']