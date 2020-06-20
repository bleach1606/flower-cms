import axios from "axios";
import config from "../config";
import AuthService from "../services/auth";

export default class OwnerService {

  static async getAllEmail() {
    const token = AuthService.getToken();
    const response = await axios.get(`${config.domain}/emails/getContact`, {
      headers: { 'Authorization': token },
      params: { q: "EMAIL" }
    })
    return response.data;
  }

  static async getAllPhoneNumber() {
    const token = AuthService.getToken();
    const response = await axios.get(`${config.domain}/emails/getContact`, {
      headers: { 'Authorization': token },
      params: { q: "PHONENUMBER" }
    })
    return response.data;
  }

  static async editOwner(id, data) {
    const token = AuthService.getToken();
    const response = await axios.put(`${config.domain}/emails/${id}/owner/`, data, {
      headers: { 'Authorization': token, 'Content-Type': 'application/json' }
    })
    return response.data;
  }

  static async deleteEmail(id) {
    const token = AuthService.getToken();
    const response = await axios.delete(`${config.domain}/emails/${id}`, {
      headers: { 'Authorization': token, 'Content-Type': 'application/json' }
    })
    return response.data;
  }

  static async editEmail(id, data) {
    const token = AuthService.getToken();
    const response = await axios.put(`${config.domain}/emails/${id}`, data, {
      headers: { 'Authorization': token, 'Content-Type': 'application/json' }
    })
    return response.data;
  }

  static async addEmail(data) {
    const token = AuthService.getToken();
    const response = await axios.post(`${config.domain}/emails/addContact`, data, {
      headers: { 'Authorization': token, 'Content-Type': 'application/json' }
    })
    return response.data;
  }

  static async getAllBankAccounts() {
    const token = AuthService.getToken();
    const response = await axios.get(`${config.domain}/emails/getBankAccount`, {
      headers: { 'Authorization': token }
    })
    return response.data;
  }

  static async addBankAccount(data) {
    const token = AuthService.getToken();
    const response = await axios.post(`${config.domain}/emails/addBankAccount`, data, {
      headers: { 'Authorization': token, 'Content-Type': 'application/json' }
    })
    return response.data;
  }

  static async deleteBankAccount(id) {
    const token = AuthService.getToken();
    const response = await axios.delete(`${config.domain}/emails/${id}/deleteBankAccount`, {
      headers: { 'Authorization': token, 'Content-Type': 'application/json' }
    })
    return response.data;
  }

  static async editBankAccount(id,data) {
    const token = AuthService.getToken();
    const response = await axios.put(`${config.domain}/emails/${id}/editBankAccount`, data, {
      headers: { 'Authorization': token, 'Content-Type': 'application/json' }
    })
    return response.data;
  }
}