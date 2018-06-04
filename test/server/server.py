# -*- coding:utf-8 -*-
from flask import Flask, request, make_response

import json, copy, random, time

app = Flask(__name__)

@app.route('/api/data', methods = ['GET', 'POST'])
def main_data():
    with open('response.json', 'r') as f:
        response = make_response(f.read())

        response.headers['Access-Control-Allow-Origin'] = '*'
        response.headers['Access-Control-Allow-Methods'] = 'GET, POST'
        response.headers['Access-Control-Allow-Headers'] = 'x-requested-with,content-type'
        return response


    # DATA_LENGTH = 50
    # DATA_DIMS = ['X', 'Y', 'value', 'score']
    # NAMES = ['Alice', 'Bob', 'Carl', 'Duke', 'Elsion']
    # CITIES = ['Beijing', 'Shanghai', 'Guangzhou']
    # JOBS = ['Worker', 'Famer', 'Doctor']
    # data = []
    # # for year in range ()
    # YEAR = [str(i) for i in range(2015, 2018)]
    # MONTH = [str(i) for i in range(1, 6)]
    # DAY = [str(i) for i in range(1, 10)]
    # for y in YEAR:
    #     for m in MONTH:
    #         for d in DAY:
    #             # for i in range(DATA_LENGTH):
    #             tmp = {}
    #             for key in DATA_DIMS:
    #                 tmp[key] = int(random.random() * 100)
    #             tmp['name'] = NAMES[int(random.random() * 100) % len(NAMES)]
    #             tmp['city'] = CITIES[int(random.random() * 100) % len(CITIES)]
    #             tmp['job'] = JOBS[int(random.random() * 100) % len(JOBS)]
    #             tmp['year'] = y
    #             tmp['month'] = m
    #             tmp['day'] = d
    #             data.append(tmp)
    #
    #
    # response = make_response(json.dumps(data))
    # # response = make_response(json.dumps(data))
    # response.headers['Access-Control-Allow-Origin'] = '*'
    # response.headers['Access-Control-Allow-Methods'] = 'GET, POST'
    # response.headers['Access-Control-Allow-Headers'] = 'x-requested-with,content-type'
    # return response

if __name__ == '__main__':
    app.run(debug = True, host='0.0.0.0', port=1996)
