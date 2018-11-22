const MENU_ROUTER = [
  {
    title: '数据源',
    icon: 'el-icon-picture-outline',
    location: { primary: 'DataCenter', secondary: 0 }
  },
  {
    title: '多维数据分析',
    icon: 'el-icon-picture-outline',
    submenu: [
      {
        title: '制作报表',
        location: { primary: 'Main', secondary: 0 }
      },
      {
        title: '探索分析',
        location: { primary: 'Main', secondary: 1 }
      }
    ]
  },
  {
    title: '仪表盘/看板',
    icon: 'el-icon-menu',
    location: { primary: 'Dash', secondary: 0 }
  }
]

export default MENU_ROUTER
