
import redis
from flask import Flask

from App.house_view import house
from App.ihome_views import ihome
from App.booking_view import book_blueprint
from App.tiaozhuan import good_blueprint
from utils.functions import init_ext
from utils.setting import SQLALCHEMY_DATABASE_URI, static_dir, templates_dir


def create_app():

    app = Flask(__name__,static_folder=static_dir,
                template_folder=templates_dir )

    app.register_blueprint(blueprint=ihome, url_prefix='/ihome')
    app.register_blueprint(blueprint=house, url_prefix='/house')
    app.register_blueprint(blueprint=book_blueprint, url_prefix='/booking')
    app.register_blueprint(blueprint=good_blueprint)

    app.config['SQLALCHEMY_DATABASE_URI'] = SQLALCHEMY_DATABASE_URI
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    # 密钥
    app.config['SECRET_KEY'] = 'secret_key'
    # SESSION类型
    app.config['SESSION_TYPE'] = 'redis'
    # 连接redis
    app.config['SESSION_REDIS'] = redis.Redis(host='127.0.0.1',
                                              port='6379'
                                              )
    # 定义前缀
    app.config['SESSION_KEY_PREFIX'] = 'ihome'

    init_ext(app)

    return app