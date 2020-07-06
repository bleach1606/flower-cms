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

  static async deleteById(id) {
    const token = AuthService.getToken();
    const response = await axios.delete(`${config.domain}/users/delete/${id}`, {
      headers: { 'Authorization': token},
    });
    return response.data;
  }

  static async updateUser(data) {
    const token = AuthService.getToken();
    const response = await axios.put(`${config.domain}/users/update`,data, {
      headers: { 'Authorization': token},
    });
    return response.data;
  }

}
