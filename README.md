# Canary BI

web端自主分析服务

> A Vue.js project

## 搭建步骤

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

```
## 线上版本
[Demo](http://ooer.space:1997)

## 效果图
Dashboard
![](http://imglf3.nosdn0.126.net/img/UnhEMnlSbXBDeGo0RUNuWjVncFBYdXRxUlNjK0Jyc1hjcm0rdmRZZTRDZmpveCtpUXI4VjRBPT0.png?imageView&thumbnail=3000y1672&type=png&quality=96&stripmeta=0)

自主分析
![](http://imglf4.nosdn0.126.net/img/UnhEMnlSbXBDeGo0RUNuWjVncFBYcXZXcjllNFpONU5remJRSUozOXN6V0dEZ2czTG82cUhnPT0.png?imageView&thumbnail=3000y1672&type=png&quality=96&stripmeta=0)

数据透视表
![](http://imglf5.nosdn0.126.net/img/UnhEMnlSbXBDeGo0RUNuWjVncFBYcmtDM1dZZ2xjYVg0R0x0Q3c2dnhUSnBjZTJwTGpIQTF3PT0.png?imageView&thumbnail=3000y1672&type=png&quality=96&stripmeta=0)

数据源配置
![](http://imglf6.nosdn0.126.net/img/UnhEMnlSbXBDeGo0RUNuWjVncFBYaDZSMllnSVN0WUxIclRycFJmbjJvTHZGWXl4V2hEQXF3PT0.png?imageView&thumbnail=3000y1677&type=png&quality=96&stripmeta=0)

## OLAP

### BI-Dataset
用于处理数据集的插件，目前默认的数据集中的数据无需主键，每个键的可能值任意。
最终很根据原始数据生成一个类似于echarts-dataset的二维数组。这个数组本质上是原始数据集中隐藏的各个含有主键的表的bridge table。但是由于原始数据可能缺乏有实际含义的主键，所以这个二维数组即便在包涵所有维度的情况下最终的数据也可能是聚合计算后的数据。

对于更为通用的多维数据集的数据透视等或数据立方体的计算等操作，也可以参考相对成熟的
+ [core-cube](https://github.com/ObservedObserver/cube-core)
+ [fast-pivot](https://github.com/ObservedObserver/fast-pivot)
