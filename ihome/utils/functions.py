from flask import session,redirect
from flask_session import Session
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy
import functools


db = SQLAlchemy()
api = Api()

def get_db_uri(DATABASE):

    user = DATABASE.get('USER')
    password = DATABASE.get('PASSWORD')
    host = DATABASE.get('HOST')
    port = DATABASE.get('PORT')
    name = DATABASE.get('NAME')
    db = DATABASE.get('DB')
    driver = DATABASE.get('DRIVER')

    return '{}+{}://{}:{}@{}:{}/{}'.format(db, driver, user, password, host, port, name)

def init_ext(app):
    db.init_app(app=app)
    api.init_app(app=app)
    Session(app)

def check_login(f):
    @functools.wraps(f)
    def runner(*args,**kwargs):
        try:
            if session['user_id']:
                return f(*args,**kwargs)
        except :
            return redirect('/ihome/login/')
    return runner