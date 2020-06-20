import axios from "axios";
import config from "../config";
import AuthService from "../services/auth";

export default class Dashboard {

  static async getListMembers() {
    const token = AuthService.getToken();
    const response = await axios.get(`${config.domain}/memberships/membershipUser`, {
      headers: { 'Authorization': token }
    })
    return response.data.data;
  }

  static async getAllCard() {
    const token = AuthService.getToken();
    const response = await axios.get(`${config.domain}/memberships/allCard`, {
      headers: { 'Authorization': token }
    })
    return response.data;
  }

  static async getMembershipByCard(params) {
    const token = AuthService.getToken();
    const response = await axios.get(`${config.domain}/memberships/getMembershipUserByType`, {
      headers: { 'Content-Type': 'application/json', 'Authorization': token },
      params: {
        type: params
      }
    })
    return response.data;
  }

  static async getListCarInGara() {
    const token = AuthService.getToken();
    const response = await axios.get(`${config.domain}/schedules/listCarInGara`, {
      headers: { 'Content-Type': 'application/json', 'Authorization': token },
    })
    return response.data;
  }

  static async getListServiceOrdered() {
    const token = AuthService.getToken();
    if (token) {
      const response = await axios.get(`${config.domain}/schedules/pendings/`, {
        headers: { 'Content-Type': 'application/json', 'Authorization': token },
      })
      return response.data;
    }

  }

}