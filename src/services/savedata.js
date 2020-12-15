export default class DateServices {
  
  static isLoggedIn() {
    return (localStorage.getItem("btc")) ? true : false;
  }

  static storeBTCData(data) {
    localStorage.setItem('btc', JSON.stringify(data.data.btc));
  }

  static getBTC() {
    return JSON.parse(localStorage.getItem('btc'))
  }

  static storeDoitacData(doitac) {
    localStorage.setItem('doitac', JSON.stringify(doitac))
  }

  static getDoitac() {
    return JSON.parse(localStorage.getItem('doitac'))
  }

  static storeHopdongTrandaus(trandaus) {
    return localStorage.setItem('trandaus', JSON.stringify(trandaus))
  }

  static getHopdongTrandaus() {
    return JSON.parse(localStorage.getItem('trandaus'))
  }
}