import axios from "axios";
import config from "../config";
import AuthService from "../services/auth";

export default class CardMembershipService {
  static async getListCardMembership() {
    const token = AuthService.getToken();
    const response = await axios.get(`${config.domain}/memberships/allCard`, {
      headers: { 'Authorization': token }
    })
    return response.data;
  }

  static async getInformationCard(id) {
    const token = AuthService.getToken();
    const response = await axios.get(`${config.domain}/memberships/${id}/getCardById`, {
      headers: { 'Authorization': token }
    })
    return response.data;
  }

  static async addCardMembership(data) {
    const token = AuthService.getToken();
    const response = await axios.post(`${config.domain}/memberships/create`, data, {
      headers: { 'Authorization': token, 'Content-Type': 'application/json' }
    })
    return response.data;
  }

  static async editCard(data, id) {
    const token = AuthService.getToken();
    const response = await axios.put(`${config.domain}/memberships/${id}/editCard`, data, {
      headers: { 'Authorization': token, 'Content-Type': 'application/json' }
    })
    return response.data;
  }

  static async deleteCard(id) {
    const token = AuthService.getToken();
    const response = await axios.delete(`${config.domain}/memberships/${id}/deleteCard`, {
      headers: { 'Authorization': token, 'Content-Type': 'application/json' }
    })
    return response.data;
  }
}