import axios from "axios";
import config from "../config";
import DataService from "./savedata";


export default class AccountService {
  static async login(username, password) {
    const response = await axios.post(`${config.domain}/public/login`, {
      username,
      password
    })
    DataService.storeBTCData(response.data);
  }
}