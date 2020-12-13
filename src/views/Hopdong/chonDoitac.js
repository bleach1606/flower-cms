import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { FormGroup, Input, Button, Card, CardBody, CardHeader, Col, Row, Table, Spinner } from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DoitacService from '../../services/doitac';
import AuthServices from '../../services/auth'

class Doitac extends Component {
  constructor(props) {
    super(props);
    this.state = {
      doitacs: [],
      ten: '',
      isLoading: true,
      object: {},
      redirect: false,
    }
  }

  getDoitac = async () => {
    try {
      const response = await DoitacService.getDoitac(this.state.ten)
      this.setState({
        doitacs: response.data,
        isLoading: false
      })
    } catch (error) {
      this.showNotification('Đã xảy ra lỗi, vui lòng thử lại sau', false);
    }
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

  openChonDoitac = async (item) => {
    console.log('item', item)
    
    this.setState({
      isLoading: true
    }, async () => {
      try {
        await AuthServices.storeDoitacData(item);
        this.setState({
          isLoading: false,
          redirect: true
        });
      } catch (error) {
        console.log(error);
      }
    })
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    })
  }

  render() {
    const { doitacs, isLoading, redirect} = this.state;
    if (redirect) {
      return <Redirect to="/hopdong" />
    }
    if (isLoading) {
      this.getDoitac('')
    }
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" lg="12">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Chọn đối tác
                <FormGroup row>
                  <Col md="3">
                  <Input style={{ marginBottom: 30}} type="text" onChange={this.handleChange('ten')} placeholder="Tìm đối tác..."/>
                  </Col>
                  <Col xs="12" md="9">
                  <Button style={{ width: 100}} block color="success" onClick={this.getDoitac}>Tìm kiếm</Button>
                  </Col>
                </FormGroup>
              </CardHeader>
              {
                isLoading ? <Spinner style={{ margin: '30px auto' }} color="dark" /> :
                  <CardBody>
                    <Table responsive striped>
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Tên đối tác</th>
                          <th>Mã số thuế</th>
                          <th>Địa chỉ</th>
                          <th>Email</th>
                          <th>Số điện thoại</th>
                          <th>Chọn đối tác</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          doitacs.length ?
                          doitacs.map(item => {
                            return (
                              <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.ten}</td>
                                <td>{item.masothue}</td>
                                <td>{item.diachi}</td>
                                <td>{item.email}</td>
                                <td>{item.sodienthoai}</td>
                                <td style={{ width: 100 }}>
                                  <Button onClick={() => this.openChonDoitac(item)} color="info" size="sm" className="btn-pill">Chọn</Button>
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

export default Doitac;
