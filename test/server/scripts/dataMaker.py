import json, random
DATA_LENGTH = 100
DATA_DIMS = ['X', 'Y', 'value']
with open('globalData.json', 'w') as f:
    data = []
    for i in range(DATA_LENGTH):
        tmp = {}
        for key in DATA_DIMS:
            tmp[key] = int(random.random() * 100)
        data.append(tmp)
    f.write(json.dumps(data))
