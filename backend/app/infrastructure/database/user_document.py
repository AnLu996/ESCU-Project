from mongoengine import Document, StringField


class UserDocument(Document):
    alias = StringField(required=True, unique=True)
    password_hash = StringField(required=True)
    rol = StringField(default='user', choices=['user', 'admin'])

    meta = {'collection': 'users'}
