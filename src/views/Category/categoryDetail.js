import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Spinner, Col, Row, Table} from 'reactstrap';
import { Redirect } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ServiceCategory from '../../services/category';
import MoneyFormat from "../Default/moneyFormat";

class CategoryDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detailCategory: [],
      redirect: false,
      isLoading: false,
      loadingdetailCategory: true
    }
  }

  componentDidMount() {
    this.getScheduleDetails(this.props.match.params.id);
  }

  getScheduleDetails = async (id) => {
    try {
      const response = await ServiceCategory.findById(id)
      this.setState({
        detailCategory: response.data,
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


  render() {
    const { detailCategory, redirect, loadingDetailSchedule} = this.state;
    if (redirect) {
      return <Redirect to="/wait-schedule" />
    }
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" lg="12">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Chi tiết danh mục
              </CardHeader>
              {
                loadingDetailSchedule ? <Spinner style={{ margin: '30px auto' }} color="dark" /> :
                  <CardBody>
                    <Table responsive striped>
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Tên sản phẩm</th>
                          <th>Avatar</th>
                          <th>Mô tả</th>
                          <th style={{ textAlign: "right" }}>Giá (VNĐ)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          detailCategory.length ?
                          detailCategory.map(item => {
                            return (
                              <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.avatar ? <img src={ "http://127.0.0.1:8080/public/download/" + item.avatar + ".png"} style={{ objectFit: 'cover', objectPosition: "center", width: 50, height: 50, borderRadius: "50%" }} className="img-avatar" alt="avatar" /> : ''}</td>
                                <td>{item.description}</td>
                                <td style={{ textAlign: "right" }}>{MoneyFormat(item.price)}</td>
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

export default CategoryDetail;
