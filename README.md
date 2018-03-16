# Manhattan-BI

A Web BI Application(Tableau like).

Webpack + Vue + Vuex | vue-router + echart + vue-echarts + semnatic-ui

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

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## 结构说明

```bash
.
├── App.vue
├── assets
│   └── logo.png
├── components
│   ├── main.vue
│   ├── Menu
│   │   └── menu.vue
│   └── Operators
│       ├── Charts
│       │   ├── barchart.vue
│       │   ├── linechart.vue
│       │   ├── piechart.vue
│       │   ├── Scatter
│       │   │   ├── map.js
│       │   │   ├── mapScatter.vue
│       │   │   ├── scatter.config.js
│       │   │   └── scatter.vue
│       │   └── table.vue
│       ├── data.vue
│       ├── dimension.vue
│       ├── dragarea.vue
│       ├── filters.vue
│       ├── main.vue
│       ├── pages.vue
│       ├── Tool
│       │   ├── range.vue
│       │   └── statistics.vue
│       ├── vizboard.vue
│       └── xymenu.vue
├── main.js
├── router
│   └── index.js
└── store
    ├── globalData.json
    ├── median.js
    ├── statistic.func.js
    └── store.js
```


### 组件说明
`components/main.vue`为主组件（根组件），由主组件引用其它组件构成整个应用。
主组件直接引用的组件为
+ `./filters.vue` 为数据筛选器组件，作用是为当前数据增设筛选条件，只将当前满足筛选条件的数据展示出来。筛选器目前支持`String`类型与`Number`类型的筛选，`String`类型筛选时，应用会自动统计该字段所有的 **unique value** 并制作一个选项列表，使用户可以选取自己所需的值作为过滤条件。`Number`类型筛选时，会给出一个区间设置器，使得用户可以选取自己所需的数值区间作为过滤条件。
  + `./dragarea.vue` 可拖拽区域组件
  + `./Tool/range.vue` 数值区间组件
+ `./pages.vue` 暂未开发该组件，预计借助该组件可以实现数据可视化的动画播放功能。
  + `./Tool/range.vue` 数值区间组件
+ `./data.vue` 数据模块组件，展示当前系统中导入的数据，提供数据标签的拖拽。
  + `./Tool/range.vue` 数值区间组件
+ `./xymenu.vue` X-Y轴组件，数据必须拉扯到该区域中才会被展示到可视化面板上，相当于需要通过将标签拖入定义对应的横纵轴为何。
  + `./Tool/range.vue` 数值区间组件
+ `./vizboard.vue` 可视化面板组件，会生成对应的可视化结果。同时该组件还包含可视化形式的切换菜单。
  + `./Charts/table.vue` 表格组件，用于展示原始数据
  + `./Charts/barchart.vue` 柱状图组件，一个维度必须为`String`类型
  + `./Charts/linechart.vue` 折线图组件，一个维度必须为`String`类型
  + `./Charts/piechart.vue` 饼图组件，一个维度必须为`String`类型
  + `./Charts/Scatter/scatter.vue` 散点图组件，两个维度必须均为`Number`类型
  + `./Charts/Scatter/mapScatter.vue` 地图散点图组件，两个维度必须均为`Number`类型
+ `./dimension.vue` 维度组件，目前该组件仅对散点图类型的可视化生效。相当于增设数据的维度，并将该维度用大小/颜色展示出来。
+ `./Tool/statistics.vue` 统计组件，用于提供数据的计数规则，如"总和", "平均值", "中位数"等。

### 数据管理
#### state
```js
state: {
  globalData: globalData,
  localData: [],
  filterData: [],
  globalKeys: [],
  globalDataLabels: {
    filter: [],
    page: [],
    data: [],
    X: [],
    Y: [],
    dimension: []
  },
  constDataLabels: [],
  currentLabel: {},
  dimensionLabels: [
    {name: '形状', style: ['circle', 'thin']},
    {name: '大小', style: ['square']},
    {name: '颜色', style: ['circle', 'green']}
  ],
  filterStatistics: [],
  filterCheckedList: [],
  transFilterData: [],
  func: ['Sum', 'Mean', 'Median', 'Count'],
  pickedFunc: 'Sum'
}
```
+ `globalData` 为全局数据，即导入的可用于做数据可视化的所有数据。
+ `localData` 旧有的组件调用数据机制，仅供表格组件展示使用。功能是根据指定的XY轴数据从globalData中抽取所需的数据。
+ `filterData` 旧有的组件调用数据机制，仅供表格组件展示使用。功能是根据filter中指定的过滤条件从localData？中抽取所需的数据。
+ `globalKeys` 暂不发挥作用。
+ `globalDataLabels` 全局的标签管理器。存储各个可被拖拽区域的标签显示。这里会对data部分做特殊的照顾，以确保data部分的label被拖拽走后不会消失。
+ `constDataLabels` 暂不发挥作用。
+ `currentLabel` 表示当前被拖拽标签的信息，暂不发挥作用。
+ `dimensionLabels` dimension模块的可选维度类型，不会被改变。
+ `filterStatistics` 过滤统计器。若存在`String`类型的filter，则会进行unique value的统计。？？

## Record

```bash
# create the project
vue init webpack Manhattan-BI

npm install vuex --save

npm install semantic-ui-css -save-dev

```
init vuex with a `store.js` file
```js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

var store = new Vuex.store({

})

export default {store}

```

import semantic-ui
```html
<style src="../../node_modules/semantic-ui-css/semantic.css"></style>
```

Install vue-echarts
```bash
npm install vue-echarts --save
```
init vue-echarts
```js
import 'echarts'
import 'echarts/extension/bmap/bmap'
import ECharts from 'vue-echarts/components/ECharts'
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/line'
import 'echarts/lib/chart/pie'
import 'echarts/lib/chart/map'
import 'echarts/lib/chart/radar'
import 'echarts/lib/chart/scatter'
import 'echarts/lib/chart/effectScatter'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/polar'
import 'echarts/lib/component/geo'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/title'
import 'echarts/lib/component/visualMap'

Vue.component('chart', ECharts)

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {
    App,
    chart: ECharts
  }
})
```
