import os

from utils.functions import get_db_uri


BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

static_dir = os.path.join(BASE_DIR, 'static')
templates_dir = os.path.join(BASE_DIR, 'templates')
DATABASE = {
    # 用户
    'USER':'root',
    # 密码
    'PASSWORD':'nj2905058',
    # 地址
    'HOST':'localhost',
    # 端口
    'PORT':'3306',
    # 数据库
    'DB':'mysql',
    # 驱动
    'DRIVER':'pymysql',
    # 数据表名称
    'NAME':'ihome'
}

SQLALCHEMY_DATABASE_URI = get_db_uri(DATABASE)



