from mongoengine import connect
from dotenv import load_dotenv
from pathlib import Path
import os


def init_db():
    env_path = Path(__file__).parent.parent / ".env"
    load_dotenv(dotenv_path=env_path)
    uri = os.getenv("MONGO_URI")
    if not uri:
        raise ValueError("MONGO_URI no esta definido en el archivo .env")
    connect(host=uri)
