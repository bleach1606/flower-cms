import axios from "axios";
import config from "../config";
import AuthService from "../services/auth";
export default class ServiceUser {

  static async findALL() {
    const token = AuthService.getToken();
    const response = await axios.get(`${config.domain}/users`, {
      headers: { 'Authorization': token },
    });
    return response.data;
  }

}
