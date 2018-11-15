import 'whatwg-fetch'
var API = {
  getMainData (api, callback) {
    fetch(api, {
      method: 'GET'
    }).then((res) => {
      return res.json()
    }).then((res) => {
      return callback(res)
    })
  },
  connectMySQL (config, callback) {
    fetch('http://localhost:1999/mysql/connect', {
      method: 'POST',
      body: JSON.stringify(config),
      // credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then((res) => {
      return res.json()
    }).then((res) => {
      return callback(res)
    })
  },
  sqlQuery (query, callback) {
    fetch('http://localhost:1999/mysql/query', {
      method: 'POST',
      body: JSON.stringify(query),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then((res) => {
      return res.json()
    }).then((res) => {
      return callback(res)
    })
  }
}

export {API}
