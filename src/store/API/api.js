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
  }
}

export {API}
