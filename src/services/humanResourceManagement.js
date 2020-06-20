import axios from "axios";
import config from "../config";
import AuthService from "../services/auth";

export default class humanResourceManagement {
  static async getListStaff() {
    const token = AuthService.getToken();
    const response = await axios.get(`${config.domain}/staff/getAll`, {
      headers: { 'Authorization': token }
    })
    return response.data;
  }

  static async getListSalaryStaff(startAt, endAt, nameStaff) {
    const token = AuthService.getToken();
    const response = await axios.get(`${config.domain}/schedules/salary`, {
      headers: { 'Authorization': token },
      params: {
        startAt: startAt,
        endAt: endAt,
        query: nameStaff
      }
    })
    return response.data;
  }

  static async getDetailSalaryStaff(id, startAt, endAt) {
    const token = AuthService.getToken();
    const response = await axios.get(`${config.domain}/schedules/${id}/SalaryForStaffs${startAt ? `?startAt=${startAt}` : ''}${endAt ? `&endAt=${endAt}` : ''}`, {
      headers: { 'Authorization': token }
    })
    return response.data;
  }

  static async getInfomationStaff(id) {
    const token = AuthService.getToken();
    const response = await axios.get(`${config.domain}/staff/${id}/info`, {
      headers: { 'Authorization': token }
    })
    return response.data;
  }

  static async addStaff(data) {
    const token = AuthService.getToken();
    const response = await axios.post(`${config.domain}/staff/create`, data, {
      headers: { 'Authorization': token, 'Content-Type': 'application/json' }
    })
    return response.data;
  }

  static async editStaff(data, id) {
    const token = AuthService.getToken();
    const response = await axios.put(`${config.domain}/staff/${id}/editStaff`, data, {
      headers: { 'Authorization': token, 'Content-Type': 'application/json' }
    })
    return response.data;
  }

  static async deleteStaff(id) {
    const token = AuthService.getToken();
    const response = await axios.delete(`${config.domain}/staff/${id}/deleteStaff`, {
      headers: { 'Authorization': token, 'Content-Type': 'application/json' }
    })
    return response.data;
  }
}