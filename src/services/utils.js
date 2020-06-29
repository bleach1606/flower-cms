import axios from "axios";
import config from "../config";


export default class Utils {

  static async uploadSingleFile(file) {
    const response = await axios.post(`${config.domain}/public/upload`, file)
    return response.data;
  }

}