const server = 'http://bi.canary.plus:7001'
const Service = {
  login (userInfo) {
    return fetch(server + '/api/login', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userInfo)
    })
  },
  register (userInfo) {
    return fetch(server + '/api/register', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userInfo)
    })
  },
  getInitData () {
    return fetch(server + '/api/getInitData', {
      method: 'GET',
      credentials: 'include'
    })
  },
  addDataSource (dataSource) {
    return fetch(server + '/api/addDataSource', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataSource)
    })
  },
  updateDataSource (dataSource) {
    return fetch(server + '/api/updateDataSource', {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataSource)
    })
  },
  deleteDataSource (id) {
    return fetch(server + '/api/deleteDataSource', {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id })
    })
  },
  addDashBoard (dashBoard) {
    return fetch(server + '/api/addDashBoard', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dashBoard)
    })
  },
  updateDashBoard (dashBoard) {
    return fetch(server + '/api/updateDashBoard', {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dashBoard)
    })
  },
  deleteDashBoard (id) {
    return fetch(server + '/api/addDashBoard', {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({id})
    })
  },
  getChartList () {
    return fetch(server + '/api/getChartList', {
      method: 'GET',
      credentials: 'include'
    })
  },
  addChart (chart) {
    return fetch(server + '/api/addChart', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(chart)
    })
  },
  updateChart (chart) {
    return fetch(server + '/api/updateChart', {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(chart)
    })
  },
  deleteChart (chart) {
    return fetch(server + '/api/deleteChart', {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(chart)
    })
  }
}

export default Service
