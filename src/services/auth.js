export default class AuthServices {
  
  static isLoggedIn() {
    return (localStorage.getItem("btc")) ? true : false;
  }

  static storeBTCData(data) {
    localStorage.setItem('btc', data.data.btc);
  }

  static getBTC() {
    return localStorage.getItem('btc')
  }

  static storeDoitacData(doitac) {
    localStorage.setItem('doitac', doitac)
  }

  static getDoitac() {
    return localStorage.getItem('doitac')
  }
}