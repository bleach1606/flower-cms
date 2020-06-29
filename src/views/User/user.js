import React, { Component } from 'react';
import { Input, Label, Modal, ModalBody, ModalHeader, ModalFooter, Button, Card, CardBody, CardHeader, Col, Row, Table, Spinner, CardFooter } from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import moment from 'moment-timezone';
import 'react-toastify/dist/ReactToastify.css';
import ServiceCategory from '../../services/category';
import ServiceUser from '../../services/user';

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listUser: [],
      isLoading: false,
      isLoadingEdit: false,
      loadinglistUser: true,
      isLoadingConfirmDone: false,
      object: {}
    }
  }

  componentDidMount() {
    this.getScheduleDetails(this.props.match.params.id);
  }

  getScheduleDetails = async () => {
    try {
      const response = await ServiceUser.findALL()
      this.setState({
        listUser: response.data,
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

  openEditFlowerProducts = (item, bo) => {
    item.active = bo
    this.setState({
      openEditFlowerProducts: !this.state.openEditFlowerProducts,
      object: item
    })
  }

  updateCategory = async () => {
    try {
      const { flowerID, name, price, description, avatar, active} = this.state;
      const data = {
        id: flowerID,
        name: name, 
        price: price,
        description: description,
        avatar: avatar,
        active: active,
      }
      await ServiceCategory.updateFlowerProducts(data)
      window.location.reload(false);
    } catch (error) {
      this.showNotification('Đã xảy ra lỗi, vui lòng thử lại sau', false);
    }
  }

  openDeleteFlowerProducts = (item) => {
    this.setState({
      openDeleteFlowerProducts: !this.state.openDeleteFlowerProducts,
      object: item
    })
  }

  render() {
    const { listUser, loadingDetailSchedule, name, price, description, openEditFlowerProducts, isLoadingEdit, openDeleteFlowerProducts, isLoadingConfirmDone, openAddFlowerProducts} = this.state;
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" lg="12">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Chi tiết danh mục
                <CardFooter>
                  <Button style={{ width: 100, float: "right"}} block color="success" onClick={this.openAddFlowerProducts}>Thêm mới</Button>
               </CardFooter>
              </CardHeader>
              {
                loadingDetailSchedule ? <Spinner style={{ margin: '30px auto' }} color="dark" /> :
                  <CardBody>
                    <Table responsive striped>
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Tên người dùng</th>
                          <th>Avatar</th>
                          <th>username</th>
                          <th>Birthday</th>
                          <th>Giới tính</th>
                          <th>Số điện thoại</th>
                          <th>Địa chỉ</th>
                          <th></th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          listUser.length ?
                          listUser.map(item => {
                            return (
                              <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.people.firstName + ' ' + item.people.lastName}</td>
                                <td>{item.people.avatar ? <img src={ "http://127.0.0.1:8080/public/download/" + item.people.avatar + ".png"} style={{ objectFit: 'cover', objectPosition: "center", width: 50, height: 50, borderRadius: "50%" }} className="img-avatar" alt="avatar" /> : ''}</td>
                                <td>{item.username}</td>
                                <td>{moment(item.people.birthday).local().format('DD/MM/YYYY HH:mm')}</td>
                                <td>{item.people.sex}</td>
                                <td>{item.people.phoneNumber}</td>
                                <td>{item.people.address}</td>
                                <td style={{ width: 100 }}>
                                  <Button onClick={() => this.openEditFlowerProducts(item)} color="info" size="sm" className="btn-pill">Chỉnh sửa</Button>
                                </td>
                                <td style={{ width: 100 }}>
                                  <Button onClick={() => this.openDeleteFlowerProducts(item.id)} color="danger" size="sm" className="btn-pill">Xóa bỏ</Button>
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
            <Modal isOpen={openEditFlowerProducts} toggle={this.openEditFlowerProducts}>
              <ModalHeader toggle={this.openEditFlowerProducts}>Chỉnh sửa dịch vụ</ModalHeader>
              <ModalBody>
                <Label htmlFor="name">Tên sản phẩm</Label>
                <Input style={{ marginBottom: 30 }} type="text" placeholder="Tên sản phẩm..." onChange={this.handleChange('name')} value={name ? name : ''} />
                <Label htmlFor="price">Giá dịch vụ</Label>
                <Input style={{ marginBottom: 30 }} type="number" placeholder="Giá sản phẩm..." onChange={this.handleChange('price')} value={price ? price : ''} />
                <Label htmlFor="description">Mô tả</Label>
                <Input style={{ marginBottom: 30 }} type="text" placeholder="Mô tả sản phẩm..." onChange={this.handleChange('description')} value={description ? description : ''} />
                <Label htmlFor="name">Ảnh đại diện dịch vụ</Label>
                <Input style={{ marginBottom: 30 }} type="file" onChange={this.fileChangedHandler} accept="image/x-png,image/gif,image/jpeg" />
              </ModalBody>
              <ModalFooter>
                {
                  isLoadingEdit ? <Button disabled color="primary">...Loading</Button> : <Button color="primary" onClick={this.updateCategory}>Xác nhận</Button>
                }
                <Button color="secondary" onClick={this.openEditFlowerProducts}>Cancel</Button>
              </ModalFooter>
            </Modal>
            
            <Modal isOpen={openAddFlowerProducts} toggle={this.openAddFlowerProducts}>
              <ModalHeader toggle={this.openAddFlowerProducts}>Thêm mới sản phẩm</ModalHeader>
              <ModalBody>
                <Label htmlFor="name">Tên sản phẩm</Label>
                <Input style={{ marginBottom: 30 }} type="text" placeholder="Tên sản phẩm..." onChange={this.handleChange('name')} value={name ? name : ''} />
                <Label htmlFor="price">Giá dịch vụ</Label>
                <Input style={{ marginBottom: 30 }} type="number" placeholder="Giá sản phẩm..." onChange={this.handleChange('price')} value={price ? price : ''} />
                <Label htmlFor="description">Mô tả</Label>
                <Input style={{ marginBottom: 30 }} type="text" placeholder="Mô tả sản phẩm..." onChange={this.handleChange('description')} value={description ? description : ''} />
                <Label htmlFor="name">Ảnh đại diện dịch vụ</Label>
                <Input style={{ marginBottom: 30 }} type="file" onChange={this.fileChangedHandler} accept="image/x-png,image/gif,image/jpeg" />
              </ModalBody>
              <ModalFooter>
                {
                  isLoadingEdit ? <Button disabled color="primary">...Loading</Button> : <Button color="primary" onClick={this.updateCategory}>Xác nhận</Button>
                }
                <Button color="secondary" onClick={this.openAddFlowerProducts}>Cancel</Button>
              </ModalFooter>
            </Modal>

            <Modal isOpen={openDeleteFlowerProducts} toggle={this.openDeleteFlowerProducts}>
              <ModalHeader toggle={this.openDeleteFlowerProducts}>Xác nhận hoàn thành dịch vụ</ModalHeader>
              <ModalBody>
                Bạn chắc chắn muốn thực hiện hành động này ?
              </ModalBody>
              <ModalFooter>
                {
                  isLoadingConfirmDone ? <Button disabled color="primary">...Loading</Button> : <Button color="primary" onClick={this.updateCategory}>Xác nhận</Button>
                }
                <Button color="secondary" onClick={this.openDeleteFlowerProducts}>Cancel</Button>
              </ModalFooter>
            </Modal>
          </Col>
        </Row>
        <ToastContainer />
      </div>
    );
  }
}

export default User;
