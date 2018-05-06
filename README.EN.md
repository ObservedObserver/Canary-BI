# Phantom-BI
> Business intellgence Application of Phantom Tiger Inc.

## Usage
```bash
npm i
npm run dev
```
Back end test scripts
```bash
pip-install flask
python3 server.py
```
## Tools
+ Vue + Vuex + SemanticUI + ECharts
+ React + AntD + ECharts

> **Question: Why Echarts not G2?** <br>
> The earilier Phantom-BI focus on the transaction from raw data to dataview. We Do not encourage to open the access for user to create the innormal charts in their mind. That's why we ignore the benefit which graphic lanauge can bring us.<br>
As for choosing from Viser or Echarts, Echarts is far more powerful that Viser(G2) currently.

## Main data structure
Main data processer`bi-dataset` is a powerful tool for you to transform standard json data to echarts dataset according to your choosen dimensions and measures.

for example:
```js
[]
```
