import React, { Component } from 'react';
import { Modal, ModalBody, ModalHeader, ModalFooter, Button, Card, CardBody, CardHeader, Col, Row, Table, Spinner } from 'reactstrap';
import moment from 'moment-timezone';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ServiceManagement from "../../services/serviceManagement";

class ConfirmSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      schedules: [],
      scheduleId: '',
      isLoading: true,
      isLoadingConfirmDone: false,
      openConfirmDoneSchedule: false,
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
      const data = await ServiceManagement.getListSchedule(3);
      this.setState({
        schedules: data.data,
        isLoading: false
      })
    } catch (error) {
      console.log(error);
    }
  }

  toPackingSchedule = async () => {
    this.setState({
      isLoadingConfirmDone: true,
    })
    try {
      await ServiceManagement.updateStatus(this.state.scheduleId, 4);
      this.showNotification("Thành công", true);
      setTimeout(() => {
        this.setState({
          openConfirmDoneSchedule: !this.state.openConfirmDoneSchedule,
          isLoadingConfirmDone: false,
          redirect: true,
        })
      }, 1000);
      window.location.reload(false);
    } catch (error) {
      this.showNotification("Đã xảy ra lỗi, vui lòng thử lại sau", false);
      this.setState({
        openConfirmDoneSchedule: !this.state.openConfirmDoneSchedule,
        isLoadingConfirmDone: false,
      })
    }
  }

  openConfirmDoneSchedule = (scheduleId) => {
    this.setState({
      openConfirmDoneSchedule: !this.state.openConfirmDoneSchedule,
      scheduleId: scheduleId
    })
  }

  render() {
    const { schedules, isLoading, openConfirmDoneSchedule, isLoadingConfirmDone } = this.state;
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" lg="12">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Danh sách đã xác nhận lịch đặt
              </CardHeader>
              {
                isLoading ?
                  <Spinner style={{ margin: '30px auto' }} color="dark" />
                  :
                  <CardBody>
                    <Table responsive striped>
                      <thead>
                        <tr>
                          <th>ID</th>
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
                                    <Button onClick={() => this.openConfirmDoneSchedule(schedule.id)} color="success" size="sm" className="btn-pill">Chuyển đóng gói</Button>
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
            <Modal isOpen={openConfirmDoneSchedule} toggle={this.openConfirmDoneSchedule}>
              <ModalHeader toggle={this.openConfirmDoneSchedule}>Xác nhận hoàn thành dịch vụ</ModalHeader>
              <ModalBody>
                Bạn chắc chắn muốn thực hiện hành động này ?
              </ModalBody>
              <ModalFooter>
                {
                  isLoadingConfirmDone ? <Button disabled color="primary">...Loading</Button> : <Button color="primary" onClick={this.toPackingSchedule}>Xác nhận</Button>
                }
                <Button color="secondary" onClick={this.openConfirmDoneSchedule}>Cancel</Button>
              </ModalFooter>
            </Modal>
          </Col>
        </Row>
        <ToastContainer />
      </div>
    );
  }
}

export default ConfirmSchedule;