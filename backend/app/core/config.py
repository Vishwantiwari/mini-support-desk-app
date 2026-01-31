from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    DATABASE_URL: str = "sqlite:///./supportdesk.db"
    CORS_ORIGINS: str = "http://localhost:5173"

settings = Settings()
