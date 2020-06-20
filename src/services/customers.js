import axios from "axios";
import config from "../config";
import AuthService from "../services/auth";

export default class CustomerManagement {
  static async getListCustomer(page, size) {
    const token = AuthService.getToken();
    const response = await axios.get(`${config.domain}/users/`, {
      headers: { 'Authorization': token },
      params: {
        page: page,
        size: size
      }
    })
    return response.data.data;
  }

  static async getPageNumber(page, size) {
    const token = AuthService.getToken();
    const response = await axios.get(`${config.domain}/users/`, {
      headers: { 'Authorization': token },
      params: {
        page: page,
        size: size
      }
    })
    return response.data.pageNumber;
  }

  static async getListMemberCustomer(page, size) {
    const token = AuthService.getToken();
    const response = await axios.get(`${config.domain}/memberships/membershipUser`, {
      headers: { 'Authorization': token },
      params: {
        page: page,
        size: size
      }
    })
    return response.data.data;
  }

  static async getPageNumberMemberCustomer(page, size) {
    const token = AuthService.getToken();
    const response = await axios.get(`${config.domain}/memberships/membershipUser`, {
      headers: { 'Authorization': token },
      params: {
        page: page,
        size: size
      }
    })
    return response.data.pageNumber;
  }

  static async getListNewCustomer(page, size) {
    const token = AuthService.getToken();
    const response = await axios.get(`${config.domain}/memberships/getUserByNotMembership`, {
      headers: { 'Authorization': token },
      params: {
        page: page,
        size: size
      }
    })
    return response.data.data;
  }

  static async getPageNumberNewCustomer(page, size) {
    const token = AuthService.getToken();
    const response = await axios.get(`${config.domain}/memberships/getUserByNotMembership`, {
      headers: { 'Authorization': token },
      params: {
        page: page,
        size: size
      }
    })
    return response.data.pageNumber;
  }

  static async getInfomationCustomer(id) {
    const token = AuthService.getToken();
    const response = await axios.get(`${config.domain}/users/${id}`, {
      headers: { 'Authorization': token }
    })
    return response.data;
  }

  static async addCustomer(data) {
    const token = AuthService.getToken();
    const response = await axios.post(`${config.domain}/users`, data, {
      headers: { 'Authorization': token, 'Content-Type': 'application/json' }
    })
    return response.data;
  }

  static async editCustomer(data, id) {
    const token = AuthService.getToken();
    const response = await axios.put(`${config.domain}/users/${id}/forManager`, data, {
      headers: { 'Authorization': token, 'Content-Type': 'application/json' }
    })
    return response.data;
  }

  static async deleteCustomer(id) {
    const token = AuthService.getToken();
    const response = await axios.delete(`${config.domain}/users/${id}`, {
      headers: { 'Authorization': token, 'Content-Type': 'application/json' }
    })
    return response.data;
  }

  static async registerCardMembership(data, id) {
    const token = AuthService.getToken();
    const response = await axios.put(`${config.domain}/memberships/${id}/regisMembership`, data, {
      headers: { 'Authorization': token, 'Content-Type': 'application/json' }
    })
    return response.data;
  }

  static async upgradeCardMembership(data, id) {
    const token = AuthService.getToken();
    const response = await axios.put(`${config.domain}/memberships/${id}/updateMembership`, data, {
      headers: { 'Authorization': token, 'Content-Type': 'application/json' }
    })
    return response.data;
  }

  static async extensionCardMembership(data, id) {
    const token = AuthService.getToken();
    const response = await axios.put(`${config.domain}/memberships/${id}/extendCard`, data, {
      headers: { 'Authorization': token, 'Content-Type': 'application/json' }
    })
    return response.data;
  }

  static async searchCustomer(param1, param2) {
    const token = AuthService.getToken();
    const response = await axios.get(`${config.domain}/memberships/filterUser`, {
      headers: { 'Content-Type': 'application/json', 'Authorization': token },
      params: {
        text: param1,
        type: param2
      }
    })
    return response.data;
  }
}