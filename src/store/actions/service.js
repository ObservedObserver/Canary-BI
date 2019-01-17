const server = 'http://localhost:7001'
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
  }
}

export default Service
