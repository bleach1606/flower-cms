import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table, Spinner } from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ServiceCategory from '../../services/category';
import MoneyFormat from "../Default/moneyFormat";

class FlowerProducts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
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
      const data = await ServiceCategory.findALL();
      this.setState({
        list: data.data,
        isLoading: false
      })
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const { list, isLoading } = this.state;
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" lg="12">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Danh sách sản phẩm hoa
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
                          <th>Tên sản phẩm</th>
                          <th>Avatar</th>
                          <th>Mô tả</th>
                          <th style={{ textAlign: "right" }}>Giá (VNĐ)</th>
                        </tr>
                      </thead>
                      <tbody>
                      {
                          list.length ?
                          list.map(item => {
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

export default FlowerProducts;