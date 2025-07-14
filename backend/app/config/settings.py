from datetime import timedelta
import os
from dotenv import load_dotenv
from pathlib import Path


env_path = Path(__file__).parent.parent.parent.parent / ".env"
load_dotenv(dotenv_path=env_path)


class Settings:
    # Flask
    SECRET_KEY = os.getenv("SECRET_KEY")

    # JWT
    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY")
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=1)

    # MongoDB
    MONGO_URI = os.getenv("MONGO_URI")


settings = Settings()
