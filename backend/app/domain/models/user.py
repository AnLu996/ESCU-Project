from mongoengine import Document, StringField

class User(Document):
    alias = StringField(required=True, unique=True)
    password = StringField(required=True)
