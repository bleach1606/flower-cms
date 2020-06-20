import axios from "axios";
import config from "../config";
import AuthService from "./auth";


export default class GetService {
  static async getListService() {
    const token = AuthService.getToken();
    const response = await axios.get(`${config.domain}/services/categories`, {
      headers: { 'Authorization': token }
    });
    return response.data;
  }

  static async getListGroupService(id) {
    const token = AuthService.getToken();
    const response = await axios.get(`${config.domain}/services/${id}/childCategories`, {
      headers: { 'Authorization': token }
    });
    return response.data;
  }

  static async managementListService(id) {
    const token = AuthService.getToken();
    const response = await axios.get(`${config.domain}/services/${id}/getCategoryAndServiceByCategory`, {
      headers: { 'Authorization': token }
    });
    return response.data;
  }

  static async getListAllService(page, size) {
    const token = AuthService.getToken();
    const response = await axios.get(`${config.domain}/services/getAllService`, {
      headers: { 'Authorization': token },
      params: {
        page: page,
        size: size
      }
    });
    return response.data.data;
  }

  static async getDetailService(id) {
    const token = AuthService.getToken();
    const response = await axios.get(`${config.domain}/services/${id}/getServiceByCategory`, {
      headers: { 'Authorization': token }
    });
    return response.data;
  }

  static async getListChildCategories(id) {
    const token = AuthService.getToken();
    const response = await axios.get(`${config.domain}/services/${id}/childCategories`, {
      headers: { 'Authorization': token }
    });
    return response.data;
  }

  static async addService(data) {
    const token = AuthService.getToken();
    const response = await axios.post(`${config.domain}/services`, data, {
      headers: { 'Authorization': token, 'Content-Type': 'application/json' }
    })
    return response.data;
  }

  static async editService(id, data) {
    const token = AuthService.getToken();
    const response = await axios.put(`${config.domain}/services/${id}/editById`, data, {
      headers: { 'Authorization': token, 'Content-Type': 'application/json' }
    })
    return response.data;
  }

  static async deleteService(id) {
    const token = AuthService.getToken();
    const response = await axios.delete(`${config.domain}/services/${id}/deleteService`, {
      headers: { 'Authorization': token, 'Content-Type': 'application/json' }
    })
    return response.data;
  }

  static async deleteListService(id) {
    const token = AuthService.getToken();
    const response = await axios.delete(`${config.domain}/services/${id}/deleteCategory`, {
      headers: { 'Authorization': token, 'Content-Type': 'application/json' }
    })
    return response.data;
  }

  static async addListServices(data) {
    const token = AuthService.getToken();
    const response = await axios.post(`${config.domain}/services/category`, data, {
      headers: { 'Authorization': token, 'Content-Type': 'application/json' }
    })
    return response.data;
  }

  static async editListServices(id, data) {
    const token = AuthService.getToken();
    const response = await axios.put(`${config.domain}/services/${id}/editByCategory`, data, {
      headers: { 'Authorization': token, 'Content-Type': 'application/json' }
    })
    return response.data;
  }

  static async addPricesService(data) {
    const token = AuthService.getToken();
    const response = await axios.post(`${config.domain}/services/addPriceForCars`, data, {
      headers: { 'Authorization': token, 'Content-Type': 'application/json' }
    })
    return response;
  }

  static async getListPriceService(carId, serviceCategoryId) {
    const token = AuthService.getToken();
    const response = await axios.get(`${config.domain}/services/getServicesOfCarByCategory`, {
      headers: { 'Authorization': token },
      params: {
        carId,
        serviceCategoryId
      }
    });
    return response.data;
  }
}