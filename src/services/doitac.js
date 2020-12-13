import axios from "axios";
import config from "../config";

export default class DoitacService {
    static async getDoitac(ten) {
        const response = await axios.get(`${config.domain}/doitac?name=`+ten)
        return response.data
    }
}