import axios from "axios";
import config from "../config";
import AuthService from "../services/auth";
export default class ServiceCategory {
  
  static async getListCategory() {
    const token = AuthService.getToken();
    const response = await axios.get(`${config.domain}/category/find-all/`, {
      headers: { 'Authorization': token },
    });
    return response.data;
  }

  static async findById(id) {
    const token = AuthService.getToken();
    const response = await axios.get(`${config.domain}/flower-products/find-by-category/${id}`, {
      headers: { 'Authorization': token },
    });
    return response.data;
  }

  static async findALL() {
    const token = AuthService.getToken();
    const response = await axios.get(`${config.domain}/flower-products/find-by-name?key=`, {
      headers: { 'Authorization': token },
    });
    return response.data;
  }
}
