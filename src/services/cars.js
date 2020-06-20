import axios from "axios";
import config from "../config";
import AuthService from "../services/auth";

export default class Cars {

  static async getListCarManufacturer() {
    const token = AuthService.getToken();
    const response = await axios.get(`${config.domain}/manufacture/all`, {
      headers: { 'Authorization': token }
    })
    return response.data;
  }

  static async addCarManufacturer(data) {
    const token = AuthService.getToken();
    const response = await axios.post(`${config.domain}/manufacture`, data, {
      headers: { 'Authorization': token, 'Content-Type': 'application/json' }
    })
    return response.data;
  }

  static async editCarManufacturer(data, id) {
    const token = AuthService.getToken();
    const response = await axios.put(`${config.domain}/manufacture/${id}/editById`, data, {
      headers: { 'Authorization': token, 'Content-Type': 'application/json' }
    })
    return response.data;
  }

  static async deleteCarManufacturer(id) {
    const token = AuthService.getToken();
    const response = await axios.delete(`${config.domain}/manufacture/${id}/deleteById`, {
      headers: { 'Authorization': token, 'Content-Type': 'application/json' }
    })
    return response.data;
  }

  static async getListCars(id) {
    const token = AuthService.getToken();
    const response = await axios.get(`${config.domain}/cars/${id}/getCarByManufacture`, {
      headers: { 'Authorization': token }
    })
    return response.data;
  }

  static async addCar(data) {
    const token = AuthService.getToken();
    const response = await axios.post(`${config.domain}/cars`, data, {
      headers: { 'Authorization': token, 'Content-Type': 'application/json' }
    })
    return response.data;
  }

  static async editCar(data, id) {
    const token = AuthService.getToken();
    const response = await axios.put(`${config.domain}/cars/${id}/editById`, data, {
      headers: { 'Authorization': token, 'Content-Type': 'application/json' }
    })
    return response.data;
  }

  static async deleteCar(id) {
    const token = AuthService.getToken();
    const response = await axios.delete(`${config.domain}/cars/${id}/deleteCarById`, {
      headers: { 'Authorization': token, 'Content-Type': 'application/json' }
    })
    return response.data;
  }

  static async getListAllCars(page, size) {
    const token = AuthService.getToken();
    const response = await axios.get(`${config.domain}/cars/getAll`, {
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
    const response = await axios.get(`${config.domain}/cars/getAll`, {
      headers: { 'Authorization': token },
      params: {
        page: page,
        size: size
      }
    })
    return response.data.pageNumber;
  }

  static async getListAllCarsByService(id, page, size, q) {
    const token = AuthService.getToken();
    const response = await axios.get(`${config.domain}/services/${id}/getCarsByServices`, {
      headers: { 'Authorization': token },
      params: {
        page: page,
        size: size,
        q
      }
    })
    return response.data.data;
  }

  static async getPageNumberByService(id, page, size, q) {
    const token = AuthService.getToken();
    const response = await axios.get(`${config.domain}/services/${id}/getCarsByServices`, {
      headers: { 'Authorization': token },
      params: {
        page: page,
        size: size,
        q
      }
    })
    return response.data.pageNumber;
  }

  static async getAllCarByService(id, page, size, q) {
    const token = AuthService.getToken();
    const response = await axios.get(`${config.domain}/services/${id}/getCarsByServices`, {
      headers: { 'Authorization': token },
      params: {
        page: page,
        size: size,
        q
      }
    })
    return response.data;
  }

  static async searchCar(params) {
    const response = await axios.get(`${config.domain}/cars/search`, {
      headers: { 'Content-Type': 'application/json' },
      params: {
        q: params
      }
    })
    return response.data;
  }

}