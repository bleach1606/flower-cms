import React, { Component } from 'react';
import { Button, Card, CardBody, CardHeader, Col, Row, Table, Spinner } from 'reactstrap';
import { Link } from "react-router-dom";
import moment from 'moment-timezone';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ServiceManagement from "../../services/serviceManagement";

class PackingSchedule extends Component {
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
      const data = await ServiceManagement.getListSchedule(4);
      this.setState({
        schedules: data.data,
        isLoading: false
      })
    } catch (error) {
      console.log(error);
    }
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
                          <td>ID</td>
                          <th>Tên khách hàng</th>
                          <th>Tên người nhận</th>
                          <th>Số điện thoại</th>
                          <th>Địa chỉ</th>
                          <th>Ngày tạo</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          schedules.length ?
                            schedules.map(schedule => {
                              return (
                                <tr key={schedule.id}>
                                  <td>{schedule.id}</td>
                                  <td>{schedule.users.people.firstName + schedule.users.people.lastName}</td>
                                  <td>{schedule.receiverName}</td>
                                  <td>{schedule.receiverTel}</td>
                                  <td>{schedule.receiverAddress}</td>
                                  <td>{moment(schedule.orderDate).local().format('DD/MM/YYYY HH:mm')}</td>
                                  <td>
                                    <Link to={`/confirmed-schedule/detail-schedule/${schedule.id}`}>
                                      <Button color="success" size="sm" className="btn-pill">Chuyển giao hàng</Button>
                                    </Link>
                                  </td>
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

export default PackingSchedule;