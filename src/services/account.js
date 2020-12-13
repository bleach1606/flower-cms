import axios from "axios";
import config from "../config";
import AuthService from "./auth";


export default class AccountService {
  static async login(username, password) {
    const response = await axios.post(`${config.domain}/public/login`, {
      username,
      password
    })
    AuthService.storeBTCData(response.data);
  }
}