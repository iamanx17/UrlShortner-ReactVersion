# Link Shortener

## Overview
This is a **FastAPI-based Link Shortener** that allows users to shorten long URLs and retrieve analytics for usage. It supports custom short URLs, expiration dates, and tracking.

## Features
- **Shorten URLs**: Convert long URLs into short, manageable links
- **Custom Aliases**: Users can define custom short URLs
- **Expiration Dates**: Set an expiry for short links
- **Click Tracking**: Track the number of times a link is accessed
- **API-Driven**: RESTful API for seamless frontend integration

## Tech Stack
- **Backend**: FastAPI, SQLModel, Redis
- **Database**: PostgreSQL / SQLite
- **Caching**: Redis for performance optimization
- **Deployment**: Docker, Kubernetes (optional)

## Installation
### Prerequisites
- Python 3.9+
- PostgreSQL / SQLite
- Redis (for caching)
- Git

### Steps to Set Up
1. **Clone the Repository**
   ```sh
   git clone <repository-url>
   cd link-shortener
   ```
2. **Create a Virtual Environment**
   ```sh
   python -m venv env
   source env/bin/activate  # On Windows: env\Scripts\activate
   ```
3. **Install Dependencies**
   ```sh
   pip install -r requirements.txt
   ```
4. **Set Up Database**
   ```sh
   alembic upgrade head  # Apply migrations
   ```
5. **Run the Application**
   ```sh
   uvicorn app.main:app --reload
   ```

## API Endpoints
| Method | Endpoint | Description |
|--------|---------|-------------|
| POST   | `/shorten` | Create a short URL |
| GET    | `/{short_code}` | Redirect to the original URL |
| GET    | `/analytics/{short_code}` | Get click statistics |

## Future Enhancements
- User Authentication & Dashboard
- QR Code Generation for Short URLs
- Link Expiry Notifications

## Contributing
Feel free to fork the repo and submit pull requests!

## License
This project is licensed under the MIT License.

