import 'whatwg-fetch'
const HOST = 'http://localhost:1996'
var API = {
  getMainData (callback) {
    fetch(HOST + '/api/data', {
      method: 'GET'
    }).then((res) => {
      return res.json()
    }).then((res) => {
      return callback(res)
    })
  }
}

export {API}
