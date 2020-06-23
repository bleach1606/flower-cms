import axios from "axios";
import config from "../config";
import AuthService from "../services/auth";
export default class serviceManagement {
  
  static async getListSchedule(status) {
    const token = AuthService.getToken();
    const response = await axios.get(`${config.domain}/orderbill/`, {
      headers: { 'Authorization': token },
      params: {
        status: status,
      }
    });
    return response.data;
  }

  static async updateStatus(id, status) {
    const token = AuthService.getToken();
    const response = await axios.put(`${config.domain}/orderbill/update-status/${id}/?status=${status}`, "", {
      headers: { 'Authorization': token }
    });

    console.log(response)

    return response.data;
  }

}