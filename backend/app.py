from flask import Flask
from backend.config import init_db

app = Flask(__name__)

init_db()
