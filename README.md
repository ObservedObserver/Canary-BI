# Canary BI

web端自主分析服务


> vue全家桶 + element-ui + echarts/g2

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
[Demo](http://bi.canary.plus:1997)

## OLAP

### BI-Dataset
用于处理数据集的插件，目前默认的数据集中的数据无需主键，每个键的可能值任意。
最终很根据原始数据生成一个类似于echarts-dataset的二维数组。这个数组本质上是原始数据集中隐藏的各个含有主键的表的bridge table。但是由于原始数据可能缺乏有实际含义的主键，所以这个二维数组即便在包涵所有维度的情况下最终的数据也可能是聚合计算后的数据。

对于更为通用的多维数据集的数据透视等或数据立方体的计算等操作，也可以参考相对成熟的
+ [core-cube](https://github.com/ObservedObserver/cube-core)
+ [fast-pivot](https://github.com/ObservedObserver/fast-pivot)

## 后端依赖
在使用mysql数据源时需要搭建sql转发服务，为了安全性问题，线上不提供开放的demo，建议自行搭建
[DataSource-Manager](https://github.com/ObservedObserver/DataSource-Manager)

### 更新
最新版本建议使用[Canary-Server](https://github.com/ObservedObserver/Canary-Server)作为后端(供测试使用)

### 提供的线上测试数据
为了方便测试，线上部署了一些可以直接使用的数据集服务(2019.2.7号失效)
+ [Titanic Dataset(891 rows)](http://ooer.space:2018/api/data/titanic)
+ [Library Dataset(200,000 rows)](http://ooer.space:2018/api/data/library)