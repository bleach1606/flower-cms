import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table, Spinner } from 'reactstrap';
import moment from 'moment-timezone';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ServiceManagement from "../../services/serviceManagement";

class ConfirmSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      schedules: [],
      isLoading: true,
      type: "",
      query: ""
    }
  }

  componentDidMount = async () => {
    await this.getListSchedule();
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    })
  }

  showNotification = (message) => {
    toast.error(message, {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 2000
    })
  }

  getListSchedule = async () => {
    try {
      const data = await ServiceManagement.getListSchedule(2);
      this.setState({
        schedules: data.data,
        isLoading: false
      })
    } catch (error) {
      console.log(error);
    }
  }

  filterListSchedule = async () => {
    const { query, type } = this.state;
    if (!query && !type) {
      await this.getListSchedule(query, type);
      return;
    }
    if (!query || !type) {
      this.showNotification("Vui lòng điền đầy đủ thông tin");
      return;
    }
    await this.getListSchedule(query, type);
  }

  render() {
    const { schedules, isLoading } = this.state;
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" lg="12">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Danh sách đặt lịch
              </CardHeader>
              {
                isLoading ?
                  <Spinner style={{ margin: '30px auto' }} color="dark" />
                  :
                  <CardBody>
                    <Table responsive striped>
                      <thead>
                        <tr>
                          <th>Tên khách hàng</th>
                          <th>Tên người nhận</th>
                          <th>Số điện thoại</th>
                          <th>Địa chỉ</th>
                          <th>Ngày tạo</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          schedules.length ?
                            schedules.map(schedule => {
                              return (
                                <tr key={schedule.id}>
                                  <td>{schedule.users.people.firstName + schedule.users.people.lastName}</td>
                                  <td>{schedule.receiverName}</td>
                                  <td>{schedule.receiverTel}</td>
                                  <td>{schedule.receiverAddress}</td>
                                  <td>{moment(schedule.orderDate).local().format('DD/MM/YYYY HH:mm')}</td>
                                </tr>
                              )
                            }) : <tr><td style={{ textAlign: 'center' }} colSpan="7">Không có dữ liệu để hiển thị</td></tr>
                        }
                      </tbody>
                    </Table>
                  </CardBody>
              }
            </Card>
          </Col>
        </Row>
        <ToastContainer />
      </div>
    );
  }
}

export default ConfirmSchedule;
