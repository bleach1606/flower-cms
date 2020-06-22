import axios from "axios";
import config from "../config";
import AuthService from "../services/auth";
export default class serviceManagement {
  
  static async getListSchedule(query) {
    const token = AuthService.getToken();
    const response = await axios.get(`${config.domain}/orderbill/`, {
      headers: { 'Authorization': token },
      params: {
        status: query,
      }
    });
    return response.data;
  }

  static async getScheduleDetails(id) {
    const token = AuthService.getToken();
    const response = await axios.get(`${config.domain}/schedules/${id}/scheduleById`, {
      headers: { 'Authorization': token }
    })
    return response.data;
  }

  static async getListSchedulePending(query, type) {
    const token = AuthService.getToken();
    const response = await axios.get(`${config.domain}/schedules/isPendingServiceInSchedule`, {
      headers: { 'Authorization': token },
      params: {
        query: query,
        type: type
      }
    })
    return response.data;
  }

  static async cancelSchedule(id, note) {
    const token = AuthService.getToken();
    const response = await axios.delete(`${config.domain}/schedules/${id}/deleteById/`, {
      headers: { 'Authorization': token }
    }, { data: note });
    return response;
  }

  static async extraFee(data) {
    const token = AuthService.getToken();
    const response = await axios.put(`${config.domain}/schedules/addSurchargeForService`, data, {
      headers: { 'Authorization': token }
    });
    return response.data;
  }

  static async confirmSchedule(id, note) {
    const token = AuthService.getToken();
    const response = await axios.put(`${config.domain}/schedules/${id}/confirm`, { note }, {
      headers: { 'Authorization': token }
    });
    return response;
  }

  static async addPreprepayment(id, data) {
    const token = AuthService.getToken();
    const response = await axios.put(`${config.domain}/schedules/${id}/editMoney`, data, {
      headers: { 'Authorization': token }
    });
    return response;
  }

  static async getListConfirmedSchedule(query, type) {
    const token = AuthService.getToken();
    const response = await axios.get(`${config.domain}/schedules/confirm`, {
      headers: { 'Authorization': token },
      params: {
        query: query,
        type: type
      }
    });
    return response.data;
  }

  static async checkinSchedule(id) {
    const token = AuthService.getToken();
    const response = await axios.put(`${config.domain}/schedules/${id}/checkin`, {}, {
      headers: { 'Authorization': token }
    });
    return response;
  }

  static async getListCheckinSchedule(query, type) {
    const token = AuthService.getToken();
    const response = await axios.get(`${config.domain}/schedules/getCheckin`, {
      headers: { 'Authorization': token },
      params: {
        query: query,
        type: type
      }
    });
    return response.data;
  }

  static async getListAllDoneSchedule(query, type) {
    const token = AuthService.getToken();
    const response = await axios.get(`${config.domain}/schedules/done`, {
      headers: { 'Authorization': token },
      params: {
        query: query,
        type: type
      }
    });
    return response.data;
  }

  static async getListStaffRecieveService(id) {
    const token = AuthService.getToken();
    const response = await axios.get(`${config.domain}/schedules/${id}/ListStaffRegis`, {
      headers: { 'Authorization': token }
    });
    return response.data;
  }

  static async confirmStaffRecieveSchedule(data) {
    const token = AuthService.getToken();
    const response = await axios.put(`${config.domain}/schedules/assign`, data, {
      headers: { 'Authorization': token, 'Content-Type': 'application/json' }
    });
    return response.data;
  }

  static async getListDoneSchedule(params) {
    const token = AuthService.getToken();
    const response = await axios.get(`${config.domain}/schedules/getServiceByStatus?username=null`, {
      headers: { 'Authorization': token },
      params: {
        username: params
      }
    });
    return response.data;
  }

  static async confirmDoneSchedule(id) {
    const token = AuthService.getToken();
    const response = await axios.get(`${config.domain}/schedules/${id}/adminConfirmDoneItem`, {
      headers: { 'Authorization': token }
    });
    return response.data;
  }

  static async doneSchedule(id) {
    const token = AuthService.getToken();
    const response = await axios.get(`${config.domain}/schedules/${id}/paySchedule`, {
      headers: { 'Authorization': token }
    });
    return response.data;
  }

  static async getListServiceForCar(id) {
    const token = AuthService.getToken();
    const response = await axios.get(`${config.domain}/schedules/${id}/listServiceForCar`, {
      headers: { 'Authorization': token }
    });
    return response.data;
  }

  static async addServiceBeforeCheckin(id, data) {
    const token = AuthService.getToken();
    const response = await axios.put(`${config.domain}/schedules/${id}/addServiceInSchedule`, data, {
      headers: { 'Authorization': token, 'Content-Type': 'application/json' }
    });
    return response.data;
  }

}