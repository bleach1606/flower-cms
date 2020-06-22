export default class AuthServices {
  static isLoggedIn() {
    return (localStorage.getItem("username") && localStorage.getItem("token")) ? true : false;
  }

  static storeUserData(data) {
    localStorage.setItem('username', data.data.user.username);
    localStorage.setItem('role', data.data.user.role);
    localStorage.setItem('token', data.data.accessToken);
  }

  static getToken() {
    console.log(localStorage.getItem("token"))
    return localStorage.getItem("token");
  }
}