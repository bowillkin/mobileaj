
from flask import Blueprint, redirect

good_blueprint = Blueprint('good_blueprint',__name__)

@good_blueprint.route('/')
def my_blueprint():

    return redirect('/ihome/')