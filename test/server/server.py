# -*- coding:utf-8 -*-
from flask import Flask, request, make_response

import json, copy, random

app = Flask(__name__)

@app.route('/api/data', methods = ['GET', 'POST'])
def main_data():
    DATA_LENGTH = 100
    DATA_DIMS = ['X', 'Y', 'value']
    NAMES = ['Alice', 'Bob', 'Carl', 'Duke', 'Elsion']
    CITIES = ['Beijing', 'Shanghai', 'Guangzhou']
    data = []
    # for year in range ()
    for i in range(DATA_LENGTH):
        tmp = {}
        for key in DATA_DIMS:
            tmp[key] = int(random.random() * 100)
        tmp['name'] = NAMES[int(random.random() * 100) % len(NAMES)]
        tmp['city'] = CITIES[int(random.random() * 100) % len(CITIES)]
        data.append(tmp)

    response = make_response(json.dumps(data))
    # response = make_response(json.dumps(data))
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Methods'] = 'GET, POST'
    response.headers['Access-Control-Allow-Headers'] = 'x-requested-with,content-type'
    return response

if __name__ == '__main__':
    app.run(debug = True, host='0.0.0.0', port=1996)
