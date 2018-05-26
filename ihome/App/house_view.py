import re

import os
from flask import Blueprint, render_template, session, jsonify, request

from App.models import *
from utils import status_code
from utils.functions import check_login

house = Blueprint('house', __name__)

base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
UPLOAD_DIRS = os.path.join(os.path.join(base_dir, 'static'), 'upload')

@house.route('/myhouse/')
@check_login
def myhouse():

    return render_template('myhouse.html')

@house.route('/myhouse1/')
@check_login
def myhouse1():
    if 'user_id' in session:
        user = User.query.filter_by(id=session['user_id']).first()
        if len(user.id_card) != 0 and len(user.id_name) != 0:
            house_list = []
            houses = House.query.all()
            for house in houses:
                house_list.append(house.to_dict())
                status_code.SUCCESS['house_list'] = house_list
            return jsonify(status_code.SUCCESS)
        else:
            return jsonify(status_code.USER_NOT_AUTH)


    return jsonify(status_code.USER_NOT_LOGIN)

@house.route('/newhouse/')
@check_login
def newhouse():

    return render_template('newhouse.html')

@house.route('/newhouse1/')
@check_login
def newhouse1():

    areas = Area.query.all()
    areas_list = []
    for area in areas:
        areas_list.append(area.to_dict())

    facilitys = Facility.query.all()
    facilitys_list = []
    for facility in facilitys:
        facilitys_list.append(facility.to_dict())

    return jsonify(areas_list=areas_list, facilitys_list=facilitys_list)

@house.route('/mypublic/', methods=['POST'])
@check_login
def mypublic():
    if request.method == 'POST':
        my_house = House()
        my_house.title = request.form.get('title')
        my_house.price = request.form.get('price')
        my_house.area_id = request.form.get('area')
        my_house.address = request.form.get('address')
        my_house.room_count = request.form.get('room_count')
        my_house.acreage = request.form.get('acreage')
        my_house.unit = request.form.get('unit')
        my_house.capacity = request.form.get('capacity')
        my_house.beds = request.form.get('beds')
        my_house.deposit = request.form.get('deposit')
        my_house.min_days = request.form.get('min_days')
        my_house.max_days = request.form.get('max_days')
        my_house.user_id = session['user_id']
        db.session.add(my_house)
        # user = User.query.filter_by(id=session['user_id']).first()
        facility = request.form.get('facility')
        facility_list = re.findall(r'\d+', facility)
        for i in facility_list:
            fa = Facility.query.get(i)
            my_house.facilities.append(fa)
        db.session.commit()
        session['my_house_id'] = my_house.id

        return jsonify(status_code.SUCCESS)

@house.route('/upload/', methods=['POST'])
@check_login
def upload():
    if request.method == 'POST':
        file_dict = request.files
        f1 = file_dict['house_image']
        if not re.match(r'^image/*', f1.mimetype):
            return jsonify(status_code.USER_UPLOAD_IMAGE_IS_ERROR)
        url = os.path.join(UPLOAD_DIRS, f1.filename)
        f1.save(url)
        image_url = os.path.join(os.path.join('\static', 'upload'), f1.filename)
        houseimage = HouseImage()
        houseimage.house_id = session['my_house_id']
        houseimage.url = image_url
        my_house = House.query.get(session['my_house_id'])
        if not my_house.index_image_url:

            my_house.index_image_url = image_url
        try:
            my_house.add_update()
            houseimage.add_update()
            data = status_code.SUCCESS
            data['url'] = image_url
            return jsonify(data)
        except Exception as e:
            return jsonify(status_code.DATABASE_ERROR)


@house.route('/detail/')
@check_login
def detail():

    return render_template('detail.html')

@house.route('/get_detail/<int:house_id>/')
@check_login
def get_detail(house_id):
    images = HouseImage.query.filter_by(house_id=house_id).all()
    image_list = []
    for image in images:
        image_list.append(image.to_dict())
    house = House.query.get(house_id)
    mine = False
    if house.user.id == session['user_id']:
        mine = True

    return jsonify(code=status_code.OK, image_list=image_list, house=house.to_full_dict(),mine=mine)









