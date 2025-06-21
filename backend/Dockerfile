FROM python:3.10-slim

WORKDIR /app

COPY requirements.txt .

RUN pip install -r requirements.txt


COPY ./app ./app


CMD ["uvicorn", "app.main:app", "--reload","--host", "0.0.0.0"  , "--port", "8000"]