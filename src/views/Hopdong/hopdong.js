import React, { Component } from 'react';
import { Button, Card, CardBody, CardHeader, Col, Row, Table, Spinner, CardFooter } from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import moment from 'moment-timezone';
import { Redirect } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import MoneyFormat from '../Default/moneyFormat'
import DateServices from '../../services/savedata'
class Doitac extends Component {
  constructor(props) {
    super(props);
    console.log(DateServices.getHopdongTrandaus())
    this.state = {
      hopdongTrandaus: DateServices.getHopdongTrandaus(),
      name: '',
      doitac: DateServices.getDoitac(),
      isLoading: false,
      isChonTrandau: false,
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

  openAddTrandau = () => {
    this.setState({
      isChonTrandau: true
    })
  }

  render() {
    const { hopdongTrandaus, isLoading, doitac, isChonTrandau} = this.state;
    if (isChonTrandau) {
      return <Redirect to="/chon-trandau" />
    }
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" lg="12">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Thông tin hợp đồng bản quyền truyền hình
                <CardFooter>
                  <Button style={{ width: 150, float: "right"}} block color="success" onClick={this.openAddTrandau}>Thêm trận đấu</Button>
               </CardFooter>
              </CardHeader>
              {
                isLoading ? <Spinner style={{ margin: '30px auto' }} color="dark" /> :
                  <CardBody>
                    <Table responsive striped>
                  <tbody>
                    <tr>
                      <th>Tên đối tác : </th>
                      <td>{doitac ? doitac.ten : ""}</td>
                    </tr>
                    <tr>
                      <th>Mã số thuế : </th>
                      <td>{doitac ? doitac.masothue : ""}</td>
                    </tr>
                    <tr>
                      <th>Địa chỉ : </th>
                      <td>{doitac ? doitac.diachi : ""}</td>
                    </tr>
                    <tr>
                      <th>Email : </th>
                      <td>{doitac ? doitac.email : ""}</td>
                    </tr>
                    <tr>
                      <th>Số điện thoại : </th>
                      <td>{doitac ? doitac.sodienthoai : ""}</td>
                    </tr>
                    <tr>
                      <th>Thời gian : </th>
                      <td>{moment(doitac.createdAt).local().format('DD/MM/YYYY HH:mm')}</td>
                    </tr>
                  </tbody>
                </Table>
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
                                  <Button onClick={() => this.openDelete(item)} color="info" size="sm" className="btn-pill">Xoá</Button>
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
