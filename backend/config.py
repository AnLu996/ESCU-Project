from mongoengine import connect


def init_db():
    connect(
        db="denuncias_db",
        host=(
            "mongodb://admin:password123@localhost:27017/"
            "denuncias_db?authSource=admin"
        )
    )
