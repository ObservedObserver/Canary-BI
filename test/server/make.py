# -*- coding: UTF-8 -*-
import json, time
with open('evaluate.json', 'r') as f:
    data = json.load(f)
    t1 = time.time()
    print('start loop')
    for item in data:
        item['层级'] = str(item['LEVEL'])
        item['GRADA_ID'] = str(item['GRADA_ID'])
        item['MON'] = str(item['MON'])
        item['时间'] = item['MON'][:4] + '-' + item['MON'][4:]
        # item['MONTH'] = item['MON'][4:]
        # item['YEAR'] = item['MON'][:4]
        item['检查类型'] = str(item['CHECK_TYPE'])
        item.pop('MON')
    t2 = time.time()
    print('end loop', t2 - t1)
    with open('response.json', 'w') as w:
        w.write(json.dumps(data))
