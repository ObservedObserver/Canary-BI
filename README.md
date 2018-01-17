# Manhattan-BI

A Web BI Application(Tableau like).

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


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
