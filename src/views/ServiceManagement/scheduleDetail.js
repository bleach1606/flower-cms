import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Spinner, Col, Row, Table, CardFooter, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Redirect } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ServiceManagement from "../../services/serviceManagement";
import moment from 'moment-timezone';
import MoneyFormat from "../Default/moneyFormat";

class ScheduleDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detailSchedule: {},
      openModalCancelSchedule: false,
      openModalConfirmSchedule: false,
      redirect: false,
      isLoading: false,
      loadingDetailSchedule: true
    }
  }

  componentDidMount() {
    this.getScheduleDetails(this.props.match.params.id);
  }

  getScheduleDetails = async (id) => {
    try {
      const response = await ServiceManagement.getScheduleDetail(id);
      this.setState({
        detailSchedule: response,
        loadingDetailSchedule: false
      })
    } catch (error) {
      this.showNotification('Đã xảy ra lỗi, vui lòng thử lại sau', false);
    }
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    })
  }

  openModalCancelSchedule = () => {
    this.setState({
      openModalCancelSchedule: !this.state.openModalCancelSchedule
    })
  }

  openModalConfirmSchedule = () => {
    this.setState({
      openModalConfirmSchedule: !this.state.openModalConfirmSchedule
    })
  }

  showNotification = (message, status) => {
    if (status) {
      toast.success(message, {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1000
      })
    } else {
      toast.error(message, {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1000
      })
    }
  }

  cancelSchedule = async () => {
    this.setState({
      isLoading: true
    })
    try {
      await ServiceManagement.updateStatus(this.props.match.params.id, 9);
      this.showNotification('Hủy đơn hàng thành công', false);
      setTimeout(() => {
        this.setState({
          openModalCancelSchedule: !this.state.openModalCancelSchedule,
          isLoading: false,
          redirect: true
        })
      }, 1000);
    } catch (error) {
      this.showNotification('Đã xảy ra lỗi, vui lòng thử lại sau', false);
      this.setState({
        openModalCancelSchedule: !this.state.openModalCancelSchedule,
        isLoading: false,
      })
    }
  }

  confirmSchedule = async () => {
    this.setState({
      isLoading: true
    })
    try {
      await ServiceManagement.updateStatus(this.props.match.params.id, 3);
      this.showNotification('Xác nhận lịch thành công', true);
      setTimeout(() => {
        this.setState({
          openModalConfirmSchedule: !this.state.openModalConfirmSchedule,
          isLoading: false,
          redirect: true
        })
      }, 1000)
    } catch (error) {
      this.showNotification("Đã xảy ra lỗi, vui lòng thử lại sau", false);
      this.setState({
        openModalConfirmSchedule: !this.state.openModalConfirmSchedule,
        isLoading: false,
      })
    }
  }


  render() {
    const { detailSchedule, isLoading, redirect, loadingDetailSchedule, openModalCancelSchedule, openModalConfirmSchedule} = this.state;
    if (redirect) {
      return <Redirect to="/wait-schedule" />
    }
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" lg="12">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Chi tiết lịch đặt
              </CardHeader>
              {
                loadingDetailSchedule ? <Spinner style={{ margin: '30px auto' }} color="dark" /> :
                  <CardBody>
                    <Table responsive striped>
                      <tbody>
                        <tr>
                          <th>Tên khách hàng</th>
                          <td>{detailSchedule.users ? detailSchedule.users.people.firstName + " " + detailSchedule.users.people.lastName : ""}</td>
                        </tr>
                        <tr>
                          <th>Tên tài khoản</th>
                          <td>{detailSchedule.users ? detailSchedule.users.username : ""}</td>
                        </tr>
                        <tr>
                          <th>Số điện thoại khách hàng</th>
                          <td>{detailSchedule.users ? detailSchedule.users.people.phoneNumber : ""}</td>
                        </tr>
                        <tr>
                          <th>Thời gian đặt</th>
                          <td>{moment(detailSchedule.createdAt).local().format('DD/MM/YYYY HH:mm')}</td>
                        </tr>
                        <tr>
                          <th>Tên người nhận</th>
                          <td>{detailSchedule.users ? detailSchedule.receiverName + " " + detailSchedule.users.people.lastName : ""}</td>
                        </tr>
                        <tr>
                          <th>Số điện thoại người nhận</th>
                          <td>{detailSchedule.users ? detailSchedule.receiverTel : ""}</td>
                        </tr>
                        <tr>
                          <th>Địa chỉ người nhận</th>
                          <td>{detailSchedule.users ? detailSchedule.receiverAddress : ""}</td>
                        </tr>
                        <tr>
                          <th>Loại hình thanh toán</th>
                          <td>{detailSchedule.payment.kind}</td>
                        </tr>
                        
                      </tbody>
                    </Table>
                    <h3 style={{ textAlign: 'center', marginBottom: 30, marginTop: 30 }}>Danh sách sản phẩm hoa được đặt</h3>
                    <Table responsive striped>
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Tên sản phẩm</th>
                          <th>Avatar</th>
                          <th>Mô tả</th>
                          <th style={{ textAlign: "right" }}>Giá (VNĐ)</th>
                          <th style={{ textAlign: "right" }}>Số lượng</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          detailSchedule.cartDetailList.map(item => (
                            <tr key={item.id}>
                              <td>{item.id}</td>
                              <td>{item.flowerProduct.name}</td>
                              <td>{item.flowerProduct.avatar ? <img src={ "http://127.0.0.1:8080/public/download/" + item.flowerProduct.avatar } style={{ objectFit: 'cover', objectPosition: "center", width: 50, height: 50, borderRadius: "50%" }} className="img-avatar" alt="avatar" /> : ''}</td>
                              <td>{item.flowerProduct.description}</td>
                              <td style={{ textAlign: "right" }}>{MoneyFormat(item.flowerProduct.price)}</td>
                              <td style={{ textAlign: "right" }}>{item.number}</td>
                            </tr>
                          ))
                        }
                      </tbody>
                      <tfoot>
                        <tr>
                          <th style={{ textAlign: 'center' }} colSpan={4}>Tổng tiền</th>
                          <td style={{ textAlign: 'right' }} colSpan={1}><strong>{
                            MoneyFormat(detailSchedule.cartDetailList.reduce((accumulator, currentValue) => accumulator + currentValue.flowerProduct.price * currentValue.number, 0))
                          }</strong></td> 
                          <td colSpan={1}></td>
                        </tr>
                      </tfoot>

                    </Table>
                  </CardBody>
              }
              <CardFooter>
                <Button block color="success" onClick={this.openModalConfirmSchedule}>Xác nhận đặt lịch</Button>
                <Button block color="danger" onClick={this.openModalCancelSchedule}>Hủy đặt lịch</Button>
              </CardFooter>
            </Card>
            <Modal isOpen={openModalCancelSchedule} toggle={this.openModalCancelSchedule}>
              <ModalHeader toggle={this.openModalCancelSchedule}>Hủy đặt lịch</ModalHeader>
              <ModalBody>
                Bạn chắc chắn muốn thực hiện hành động này ?
              </ModalBody>
              <ModalFooter>
                {
                  isLoading ? <Button disabled color="primary">...Loading</Button> : <Button color="primary" onClick={this.cancelSchedule}>Xác nhận</Button>
                }
                <Button color="secondary" onClick={this.openModalCancelSchedule}>Cancel</Button>
              </ModalFooter>
            </Modal>
            <Modal isOpen={openModalConfirmSchedule} toggle={this.openModalConfirmSchedule}>
              <ModalHeader toggle={this.openModalConfirmSchedule}>Xác nhận đặt lịch</ModalHeader>
              <ModalBody>
                Bạn chắc chắn muốn thực hiện hành động này ?
              </ModalBody>
              <ModalFooter>
                {
                  isLoading ? <Button disabled color="primary">...Loading</Button> : <Button color="primary" onClick={this.confirmSchedule}>Xác nhận</Button>
                }
                <Button color="secondary" onClick={this.openModalConfirmSchedule}>Cancel</Button>
              </ModalFooter>
            </Modal>
          </Col>
        </Row>
        <ToastContainer />
      </div>
    );
  }
}

export default ScheduleDetail;
