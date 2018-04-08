import json, random
DATA_LENGTH = 100
DATA_DIMS = ['X', 'Y', 'value']
NAMES = ['Alice', 'Bob', 'Carl', 'Duke', 'Elsion']
with open('globalData.json', 'w') as f:
    data = []
    # for year in range ()
    for i in range(DATA_LENGTH):
        tmp = {}
        for key in DATA_DIMS:
            tmp[key] = int(random.random() * 100)
        tmp['name'] = NAMES[int(random.random() * 100) % 5]
        data.append(tmp)
    f.write(json.dumps(data))
