from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    DATABASE_URL: str = "sqlite:///./supportdesk.db"

    CORS_ORIGINS: str = "http://localhost:5173,http://127.0.0.1:5173"

    def cors_list(self):
        return [o.strip() for o in self.CORS_ORIGINS.split(",") if o.strip()]

settings = Settings()
