var INIT_CENTER = [104.06, 30.67]
var bmapOption = {
  bmap: {
    center: INIT_CENTER,
    // 中心位置坐标
    zoom: 3,
    // 地图缩放比例
    roam: true,
    // 开启用户缩放
    mapStyle: {
      // 百度地图自定义样式
      styleJson: [
        {
          'featureType': 'land',
          'elementType': 'all',
          'stylers': {
            'color': '#073763'
          }
        },
        // 水系
        {
          'featureType': 'water',
          'elementType': 'all',
          'stylers': {
            'color': '#073763',
            'lightness': -54,
            'visibility': 'off'
          }
        },
        // 国道与高速
        {
          'featureType': 'highway',
          'elementType': 'geometry',
          'stylers': {
            'color': '#45818e',
            'lightness': -22,
            'visibility': 'on'
          }
        },
        {
          'featureType': 'highway',
          'elementType': 'labels',
          'stylers': {
            'color': '#45818e',
            'lightness': -22,
            'visibility': 'off'
          }
        },
        {
          'featureType': 'railway',
          'elementType': 'all',
          'stylers': {
            'lightness': -10
          }
        },
        // 边界线
        {
          'featureType': 'boundary',
          'elementType': 'all',
          'stylers': {
            'color': '#ffffff',
            'lightness': -62,
            'visibility': 'on'
          }
        },
        // 行政标注
        {
          'featureType': 'label',
          'elementType': 'labels.text.fill',
          'stylers': {
            'color': '#ffffff',
            'visibility': 'on'
          }
        },
        {
          'featureType': 'label',
          'elementType': 'labels.text.stroke',
          'stylers': {
            'color': '#444444',
            'visibility': 'on'
          }
        }
      ]
    }
  },
  // visualMap: {
  //   // 视觉映射组件
  //   type: 'continuous',
  //   min: 0,
  //   max: 100,
  //   calculable: true,
  //   // inRange: {
  //   //   color: ['#32c2cb', '#ebde36', '#f13d51']
  //   // },
  //   textStyle: {
  //     color: '#fff'
  //   }
  // },
  series: [
    {
      name: '指数',
      type: 'scatter',
      coordinateSystem: 'bmap',
      data: []
      // symbolSize (val) {
      //   return (val[2] * 0.3) + 10
      // }
      // 坐标系使用bmap
      // data: this.$store.state.geoData
    }
  ]
}

export {bmapOption, INIT_CENTER}
