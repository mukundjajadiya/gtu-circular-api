from flask import render_template
from flask import Flask, request, jsonify, redirect
from apscheduler.schedulers.background import BackgroundScheduler
from datetime import date
from dotenv import load_dotenv
import os
# import custom function
from gtuapi import get_result

load_dotenv('.env')
app = Flask(__name__)
app.env == 'development'
dt = None

gtu_circular = get_result()


def today_circular():
    result = []
    global gtu_circular
    dt = date.today().strftime("%d-%b-%Y")
    print(f'today DATE : {dt}')

    for circular in gtu_circular:
        # if circular['date'] == '3-Sep-2021':
        if circular["date"] == dt:
            result.append(circular)

    if len(result) > 0:
        return result
    else:
        return [{"Note": "Today's circular is not available yet.",
                 "date": f"{dt}"}]


def custom():
    global gtu_circular
    gtu_updated_circular = get_result()

    if gtu_circular != gtu_updated_circular:
        gtu_circular = gtu_updated_circular


sched = BackgroundScheduler(daemon=True)
sched.add_job(custom, 'interval', minutes=10)
sched.start()


@app.route("/")
def home():
    return jsonify(gtu_circular)


@app.route("/today-circular")
def get_today_circular():
    today_circulars = today_circular()
    return jsonify(today_circulars)


@app.errorhandler(404)
def page_not_found(e):
    return redirect('http://127.0.0.1:5000/')


if __name__ == "__main__":
    assert os.path.exists('.env')
    os.environ['FLASK_ENV'] = 'development'
    app.run(debug=True)
