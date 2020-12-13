import React, { Component } from 'react';
import { FormGroup,Label, Input, Button, Card, CardBody, CardHeader, Col, Row, Table, Spinner, CardFooter } from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import moment from 'moment-timezone';
import 'react-toastify/dist/ReactToastify.css';
import DoitacService from '../../services/doitac';
import MoneyFormat from '../Default/moneyFormat'

class Doitac extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hopdongTrandaus: [],
      name: '',
      isLoading: false,
      object: {},
    }
  }

  getScheduleDetails = async () => {
    try {
      const response = await DoitacService.getDoitac(this.name)
      this.setState({
        doitacs: response.data,
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
    const { hopdongTrandaus, isLoading, object} = this.state;
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" lg="12">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Danh sách trận đấu hợp đồng
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="ten">Tên đối tác : </Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input type="text" onChange={this.handleChange('ten')} id="ten" name="ten" />
                  </Col>
                  <Col md="3">
                    <Label htmlFor="masothue">Mã số thuế : </Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input type="text" onChange={this.handleChange('masothue')} id="masothue" name="masothue" />
                  </Col>
                  <Col md="3">
                    <Label htmlFor="diachi">Địa chỉ : </Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input type="text" onChange={this.handleChange('diachi')} id="diachi" name="diachi" />
                  </Col>
                  <Col md="3">
                    <Label htmlFor="email">Email : </Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input type="text" onChange={this.handleChange('email')} id="email" name="email" />
                  </Col>
                  <Col md="3">
                    <Label htmlFor="sodienthoai">Số điện thoại : </Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input type="text" onChange={this.handleChange('sodienthoai')} id="sodienthoai" name="sodienthoai" />
                  </Col>
                </FormGroup>
                <Table responsive striped>
                  <tbody>
                    <tr>
                      <th>Tên đối tác : </th>
                      <td>{object.users ? object.users.people.firstName + " " + object.users.people.lastName : ""}</td>
                    </tr>
                    <tr>
                      <th>Mã số thuế : </th>
                      <td>{object.users ? object.users.username : ""}</td>
                    </tr>
                    <tr>
                      <th>Địa chỉ : </th>
                      <td>{object.users ? object.users.people.phoneNumber : ""}</td>
                    </tr>
                    <tr>
                      <th>Email : </th>
                      <td>{object.users ? object.receiverTel : ""}</td>
                    </tr>
                    <tr>
                      <th>Số điện thoại : </th>
                      <td>{object.users ? object.receiverTel : ""}</td>
                    </tr>
                    <tr>
                      <th>Thời gian : </th>
                      <td>{moment(object.createdAt).local().format('DD/MM/YYYY HH:mm')}</td>
                    </tr>
                  </tbody>
                </Table>
                

                <CardFooter>
                  <Button style={{ width: 150, float: "right"}} block color="success" onClick={this.openAddFlowerProducts}>Thêm trận đấu</Button>
               </CardFooter>
               
              </CardHeader>
              {
                isLoading ? <Spinner style={{ margin: '30px auto' }} color="dark" /> :
                  <CardBody>
                    <Table responsive striped>
                      <thead>
                        <tr>
                          <th>STT</th>
                          <th>Tên trận đấu</th>
                          <th>santhidau</th>
                          <th>Địa chỉ</th>
                          <th>Thời gian thi đấu</th>
                          <th>Phí quảng cáo</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          hopdongTrandaus.length ?
                          hopdongTrandaus.map(item => {
                            return (
                              <tr key={item.id}>
                                <td>{1}</td>
                                <td>{item.ten}</td>
                                <td>{item.santhidau}</td>
                                <td>{item.diachi}</td>
                                <td>{moment(item.thoigian).local().format('DD/MM/YYYY HH:mm')}</td>
                                <td>{100000}</td>
                                <td style={{ width: 100 }}>
                                  <Button onClick={() => this.openEditUser(item)} color="info" size="sm" className="btn-pill">Chỉnh sửa</Button>
                                </td>
                              </tr>
                            )
                          }) : <tr><td style={{ textAlign: 'center' }} colSpan="7">Không có dữ liệu để hiển thị</td></tr>
                        }
                      </tbody>
                      <tfoot>
                        <tr>
                          <th style={{ textAlign: 'center' }} colSpan={4}>Tổng tiền</th>
                          <td style={{ textAlign: 'right' }} colSpan={1}><strong>{
                            MoneyFormat(hopdongTrandaus.reduce((accumulator, currentValue) => accumulator + currentValue.phiquancao, 0))
                          }</strong></td> 
                          <td colSpan={1}></td>
                        </tr>
                      </tfoot>
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
