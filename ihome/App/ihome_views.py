import re

import os
from flask import Blueprint, render_template, request, jsonify, redirect, session

from App.house_view import UPLOAD_DIRS
from App.models import *
# 或者导入App.models import db  要初始化后的db才能创建数据表
from utils import status_code
from utils.functions import check_login


ihome = Blueprint('ihome', __name__)

@ihome.route('/')
def index():

    return render_template('index.html')

@ihome.route('/createtb/')
@check_login
def createtb():

    db.create_all()

    return '数据表创建成功'

@ihome.route('/register/', methods=['GET', 'POST'])
def register():
    if request.method == 'GET':
        return render_template('register.html')
    if request.method == 'POST':
        mobile = request.form.get('mobile')
        password= request.form.get('password')
        password2 = request.form.get('password2')

        if not all([mobile, password, password2]):  #验证参数是否有空字符串
            # all([]) 里面列表里面如果有空字符串,则返回False,否则返回true

            return jsonify(status_code.USER_REGISTER_PARAMS_ERROR)

        if not re.match(r'^1[34578]\d{9}$', mobile):    #验证手机号码是否正确

            return jsonify(status_code.USER_REGISTER_MOBILE_ERROR)

        if User.query.filter_by(phone=mobile).count():  # 验证手机号码是否已经注册
            return jsonify(status_code.USER_REGISTER_MOBILE_IS_EXSITS)

        if password != password2:

            return jsonify(status_code.USER_REGISTER_PASSWORD_IS_ERROR)

        user = User()
        user.phone = mobile
        user.name = mobile
        user.password = password    # 在models.py里面设置了修改器
        try:
            user.add_update()   # 在models.py里面设置了该方法对应的操作程序
            return jsonify(status_code.SUCCESS)
        except Exception as e:
            return jsonify(status_code.DATABASE_ERROR)



@ihome.route('/login/', methods=['GET', 'POST'])
def login():
    if request.method == 'GET':
        return render_template('login.html')
    if request.method == 'POST':
        mobile = request.form.get('mobile')
        password = request.form.get('password')
        if not User.query.filter_by(phone=mobile).count():
            return jsonify(status_code.USERNAME_NOT_EXIST)
        else:
            user = User.query.filter_by(phone=mobile).first()
            if not user.check_pwd(password):
                return jsonify(status_code.USER_PASSWORD_ERROR)
            else:
                session['user_id'] = user.id
                return jsonify(status_code.SUCCESS)

@ihome.route('/my/', methods=['GET'])
@check_login
def my():

    return render_template('my.html')

@ihome.route('/user/', methods=['GET'])
@check_login
def user():
    user_id = session['user_id']
    user = User.query.get(user_id)
    user = user.to_basic_dict()
    user['code'] = '200'
    return jsonify(user)


@ihome.route('/profile/', methods=['GET', 'PUT'])
@check_login
def profile():
    if request.method == 'GET':
        user = User.query.filter_by(id=session['user_id']).first()

        return render_template('profile.html', user=user)
    if request.method == 'PUT':
        file_dict = request.files
        username = request.form.get('username')
        if 'avatar' in file_dict:
            f1 = file_dict['avatar']

            if not re.match(r'^image/*', f1.mimetype):

                return jsonify(status_code.USER_UPLOAD_IMAGE_IS_ERROR)

            url = os.path.join(UPLOAD_DIRS, f1.filename)
            f1.save(url)

            user = User.query.filter_by(id=session['user_id']).first()
            image_url = os.path.join(os.path.join('\static', 'upload'), f1.filename)
            user.avatar = image_url
            if User.query.filter_by(name=username).count():
                status_code.USER_NAME_HAS_REGISTERED['user_name'] = user.name
                return jsonify(status_code.USER_NAME_HAS_REGISTERED)
            user.name = username
            try:
                user.add_update()
                data = status_code.SUCCESS
                data['url'] = image_url
                data['name'] = username
                return jsonify(data)
            except Exception as e:
                return jsonify(status_code.DATABASE_ERROR)
        else:
            user = User.query.filter_by(id=session['user_id']).first()
            if User.query.filter_by(name=username).count():
                status_code.USER_NAME_HAS_REGISTERED['user_name'] = user.name
                return jsonify(status_code.USER_NAME_HAS_REGISTERED)
            else:
                user.name = username
                try:
                    user.add_update()
                    data = status_code.SUCCESS
                    data['name'] = username
                    return jsonify(data)
                except Exception as e:
                    return jsonify(status_code.DATABASE_ERROR)


@ihome.route('/auths/', methods=['GET'])
@check_login
def auths():
    user = User.query.filter_by(id=session['user_id']).first()
    data = status_code.SUCCESS
    data['id_card'] = user.id_card
    return jsonify(data)


@ihome.route('/auth/', methods=['GET', 'POST'])
@check_login
def auth():
    if request.method == 'GET':
        user = User.query.filter_by(id=session['user_id']).first()
        if user.id_name:
            return render_template('auth.html', user=user)
        else:
            return render_template('auth.html', user='')
    if request.method == 'POST':

        # 1.同步提交请求!
        # real_name = request.form.get('real_name')
        # id_card = request.form.get('id_card')
        # user = User.query.filter_by(id=session['user_id']).first()
        # if user:
        #     user.id_name = real_name
        #     if not re.match('^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|[xX])$', id_card):
        #         return '身份证不正确'
        #     user.id_card = id_card
        #     try:
        #         user.add_update()
        #         return render_template('auth.html', user=user)
        #     except Exception as e:
        #         return 'error'

        # 2. 异步提交请求 !
        real_name = request.form.get('id_name')
        id_card = request.form.get('id_card')
        if not all([real_name, id_card]):
            return jsonify(status_code.USER_AUTH_PARAMS_ERROR)
        user = User.query.filter_by(id=session['user_id']).first()
        if user:
            user.id_name = real_name
            if not re.match('^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|[xX])$', id_card):
                return jsonify(status_code.USER_IDENTIFICATION_INFORMATION_ERROR)
            user.id_card = id_card
            try:
                user.add_update()
                return jsonify(status_code.SUCCESS)
            except Exception as e:
                return jsonify(status_code.DATABASE_ERROR)
        else:
            return jsonify(status_code.USERNAME_NOT_EXIST)


@ihome.route('/logout/')
@check_login
def logout():
    try:
        session.clear()
        return jsonify(status_code.SUCCESS)
    except Exception as e:
        return jsonify(status_code.DATABASE_ERROR)

@ihome.route('/islogin/')
def islogin():
    if 'user_id' in session:
        user = User.query.filter_by(id=session['user_id']).first()
        areas = Area.query.order_by(Area.id.asc()).all()
        arealist = [area.to_dict() for area in areas]
        houses = House.query.order_by(House.id.desc()).all()[:10]
        houselist = [house.to_dict() for house in houses]
        status_code.SUCCESS['houselist'] = houselist
        status_code.SUCCESS['arealist'] = arealist
        status_code.SUCCESS['user_name'] = user.name
        return jsonify(status_code.SUCCESS)
    else:
        areas = Area.query.order_by(Area.id.asc()).all()
        arealist = [area.to_dict() for area in areas]
        houses = House.query.order_by(House.id.desc()).all()[:10]
        houselist = [house.to_dict() for house in houses]
        status_code.USER_NOT_AUTH['houselist'] = houselist
        status_code.USER_NOT_AUTH['arealist'] = arealist
        return jsonify(status_code.USER_NOT_AUTH)


@ihome.route('/gosearch/')
def gosearch():


    return render_template('search.html')

@ihome.route('/gosearch1/')
def gosearch1():

    areas = Area.query.all()
    arealist = [area.to_dict() for area in areas]
    return jsonify(code=status_code.OK,arealist=arealist)

@ihome.route('/gosearch2/')
def gosearch2():
    aid = request.args.get('areaId')
    sd = request.args.get('startDate')
    ed = request.args.get('endDate')
    std = request.args.get('std')
    # 筛选在该区域内的房子
    houses = House.query.filter_by(area_id=aid)
    # 筛选满足时间的房子
    orders1 = Order.query.filter(sd<=Order.begin_date, ed>=Order.end_date)
    orders2 = Order.query.filter(sd>=Order.begin_date, ed<=Order.end_date)
    orders3 = Order.query.filter(ed>=Order.begin_date, ed<=Order.end_date)
    orders4 = Order.query.filter(sd>=Order.begin_date, sd<=Order.end_date)
    house_id_list = [order.house_id for order in orders1] + [order.house_id for order in orders2] + [order.house_id for order in orders3] + [order.house_id for order in orders4]
    house_id_list = list(set(house_id_list))

    houses = houses.filter(House.id.notin_(house_id_list))


    if std == '最新上线':
        houses = houses.order_by(House.id.desc())
    elif std == '入住最多':
        houses = houses.order_by(House.room_count.desc())
    elif std == '价格 低-高':
        houses = houses.order_by(House.price.asc())
    elif std == '价格 高-低':
        houses = houses.order_by(House.price.desc())
    houses = [house.to_dict() for house in houses.all()]

    return jsonify(code=status_code.OK,houses=houses)



