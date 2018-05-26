from datetime import datetime

from flask import Blueprint, render_template, request, jsonify, session

from App.models import House, Order
from utils import status_code
from utils.functions import check_login

book_blueprint = Blueprint('book_blueprint', __name__)


@book_blueprint.route('/')
@check_login
def my_book():

    return render_template('booking.html')

@book_blueprint.route('/mybook1/')
@check_login
def my_book1():
    house_id = request.args.get('house_id')
    house = House.query.get(house_id)
    title = house.title
    price = house.price
    house_index_image = house.index_image_url
    status_code.SUCCESS['title'] = title
    status_code.SUCCESS['price'] = price
    status_code.SUCCESS['house_index_image'] = house_index_image
    return jsonify(status_code.SUCCESS)



@book_blueprint.route('/get_order/', methods=['POST'])
@check_login
def get_order():
    house_id = request.form.get('house_id')
    begin_date = request.form.get('start_date')
    end_date = request.form.get('end_date')
    if not all([house_id, begin_date, end_date]):
        return jsonify(status_code.PARAMS_ERROR)
    x = (datetime.strptime(end_date, '%Y-%m-%d') - datetime.strptime(begin_date, '%Y-%m-%d')).days
    # 如果开始时间大于结束时间. 进行判断 返回参数错误
    if x < 0:
        return jsonify(status_code.END_TIME_IS_ERROR)

    days = x + 1
    house_price = House.query.filter_by(id=house_id).first().price
    amout = days * house_price
    # 创建订单
    order = Order()
    order.user_id = session['user_id']
    order.house_id = house_id
    order.begin_date = begin_date
    order.end_date = end_date
    order.days = days
    order.house_price = house_price
    order.amout = amout
    try:
        order.add_update()
        return jsonify(status_code.SUCCESS)
    except:
        return jsonify(status_code.DATABASE_ERROR)

@book_blueprint.route('/orders/')
@check_login
def orders():

    return render_template('orders.html')

@book_blueprint.route('/myorders/')
@check_login
def myorders():
    myorders = Order.query.filter_by(user_id=session['user_id'])
    myorderlist = []
    for myorder in myorders:
        myorderlist.append(myorder.to_dict())
    status_code.SUCCESS['myorderlist'] = myorderlist
    return jsonify(status_code.SUCCESS)

@book_blueprint.route('/lorders/')
@check_login
def lorders():

    return render_template('lorders.html')

@book_blueprint.route('/mylorders/')
@check_login
def mylorders():
    all_orders = Order.query.all()
    lorders = []
    for order in all_orders:
        if order.house.user.id == session['user_id']:
            lorders.append(order)
        else:
            continue
    lorderlist = []
    for lorder in lorders:
        lorderlist.append(lorder.to_dict())
    status_code.SUCCESS['lorderlist'] = lorderlist
    return jsonify(status_code.SUCCESS)

@book_blueprint.route('/accept/')
def accept():
    order_id = request.args.get('order_id')
    order = Order.query.filter_by(id=order_id).first()
    order.status = 'WAIT_PAYMENT'
    try:
        order.add_update()
        return jsonify(status_code.SUCCESS)
    except:
        return jsonify(status_code.DATABASE_ERROR)

@book_blueprint.route('/refuse/')
def refuse():
    order_id = request.args.get('order_id')
    order = Order.query.get(order_id)
    order.status = 'REJECTED'
    order.comment = request.args.get('comment')
    if len(order.comment) == 0:
        return jsonify(status_code.REJECTION_IS_EMPTY)
    try:
        order.add_update()
        return jsonify(status_code.SUCCESS)
    except:
        return jsonify(status_code.DATABASE_ERROR)


