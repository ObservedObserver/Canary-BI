# Manhattan-BI

A Web BI Application(Tableau like).

Webpack + Vue + Vuex + echart4+ + vue-echarts + element-ui

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

## 结构说明

```bash
.
├── Menu
│   └── menu.vue (左侧菜单栏)
├── Operators
│   ├── MagicChart
│   │   ├── barchart.vue (柱状图)
│   │   ├── linechart.vue (折线图插件)
│   │   ├── piechart.vue (饼图插件)
│   │   ├── scatter.vue (散点图插件)
│   │   └── table.vue (表格)
│   ├── Tool
│   │   ├── filters
│   │   │   ├── collapse.vue
│   │   │   ├── form.vue
│   │   │   ├── index.vue
│   │   │   └── silder.vue
│   │   ├── range.vue
│   │   └── statistics.vue
│   ├── data.vue (放置数据标签的模块)
│   ├── dimension.vue
│   ├── dragarea.vue (所有存放可拖拽标签的)
│   ├── main.vue
│   ├── vizboard.vue (存放数据可视化图表的面板)
│   └── xymenu.vue (存放xAxis与yAxis中所有的数据标签)
└── main.vue
```


### 组件说明

### 数据管理
#### state
```js
state: {
  globalData: [], // 全局的源数据
  globalDataLabels: { // 全局数据标签
    filter: [], // 可与filters合并
    page: [], // 未使用
    data: [],
    X: [],
    Y: [],
    dimension: [] // 未使用
  },
  currentLabel: {}, // 当前拖拽/操作的标签
  dimensionLabels: [ // 未使用
    {name: '形状', style: ['circle', 'thin']},
    {name: '大小', style: ['square']},
    {name: '颜色', style: ['circle', 'green']}
  ],
  dataAggregation: true, // 数据聚合模式
  filters: [], // 过滤器
  func: ['Sum', 'Mean', 'Median', 'Count'], // 统计函数
  pickedFunc: 'Sum', // 当前使用的统计函数
  valueSet: {} // 所有维度与度量的所有值的集合
},
```
### getters
+ `originDataset` 将源数据转换为二维数组格式(类csv)
+ `originLabels` 将所有的data标签进行分类(分为维度与度量)
+ `biLabels` 将用户选择的(位于X标签区域与Y标签区域中)标签进行分类
+ `viewData` 经过过滤后的视图数据
+ `biDimension` 获取所选所有维度所有取值的排列组合矩阵
+ `biDataset`获取最终用于图表生成的矩阵

### 主数据结构
```js
// dimensions
['name', 'city']
// measures
['value']
// biDiemnsion
[
  ['name', 'city'],
  ['Alice', 'Shanghai'],
  ['Alice', 'Beijing'],
  ['Alice', 'Hangzhou'],
  ['Bob', 'Shanghai'],
  ['Bob', 'Beijing'],
  ['Bob', 'Hangzhou']
]
// biDataset
[
  ['name', 'city', 'value'],
  ['Alice', 'Shanghai', 40],
  ['Alice', 'Beijing', 28],
  ['Alice', 'Hangzhou', 69],
  ['Bob', 'Shanghai', 12],
  ['Bob', 'Beijing', 20],
  ['Bob', 'Hangzhou', 60]
]
```

### BI-Dataset
用于处理数据集的插件，目前默认的数据集中的数据无需主键，每个键的可能值任意。
最终很根据原始数据生成一个类似于echarts-dataset的二维数组。这个数组本质上是原始数据集中隐藏的各个含有主键的表的bridge table。但是由于原始数据可能缺乏有实际含义的主键，所以这个二维数组即便在包涵所有维度的情况下最终的数据也可能是聚合计算后的数据。
