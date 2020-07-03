import React, { Component } from 'react';
import { Input, Label, Modal, ModalBody, ModalHeader, ModalFooter, Button, Card, CardBody, CardHeader, Col, Row, Table, Spinner } from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ServiceCategory from '../../services/category';
import MoneyFormat from "../Default/moneyFormat";
import { bool } from 'prop-types';
import Utils from '../../services/utils'

class FlowerProducts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      isLoading: true,
      isLoadingEdit: false,
      loadingdetailCategory: true,
      isLoadingConfirmDone: false,
      flowerID: '',
      name: '', 
      price: '', 
      description: '',
      avatar: '',
      active: bool,
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

  fileChangedHandler = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData()
    formData.append(
      'file',
      file,
      file.name
    )
    const response = await Utils.uploadSingleFile(formData);
    this.setState({
      avatar: response.data
    })
  }

  openEditFlowerProducts = (flowerID, name, price, description, avatar, active) => {
    this.setState({
      openEditFlowerProducts: !this.state.openEditFlowerProducts,
      flowerID: flowerID,
      name: name,
      price: price,
      description: description,
      avatar: avatar,
      active: active
    })
  }

  openDeleteFlowerProducts = (flowerID, name, price, description, avatar, active) => {
    this.setState({
      openDeleteFlowerProducts: !this.state.openDeleteFlowerProducts,
      flowerID: flowerID,
      name: name,
      price: price,
      description: description,
      avatar: avatar,
      active: active
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
        active: active
      }
      console.log(data)
      await ServiceCategory.updateFlowerProducts(data)
      window.location.reload(false);
    } catch (error) {
      this.showNotification('Đã xảy ra lỗi, vui lòng thử lại sau', false);
    }
  }

  render() {
    const { list, isLoading, openEditFlowerProducts, name, price, description, isLoadingEdit, openDeleteFlowerProducts, isLoadingConfirmDone } = this.state;
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
                          <th></th>
                          <th></th>
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
                                <td>{item.avatar ? <img src={ "http://127.0.0.1:8080/public/download/" + item.avatar} style={{ objectFit: 'cover', objectPosition: "center", width: 50, height: 50, borderRadius: "50%" }} className="img-avatar" alt="avatar" /> : ''}</td>
                                <td>{item.description}</td>
                                <td style={{ textAlign: "right" }}>{MoneyFormat(item.price)}</td>
                                <td style={{ width: 100 }}>
                                  <Button onClick={() => this.openEditFlowerProducts(item.id, item.name, item.price ,item.description, item.avatar, true)} color="info" size="sm" className="btn-pill">Chỉnh sửa</Button>
                                </td>
                                <td style={{ width: 100 }}>
                                  <Button onClick={() => this.openDeleteFlowerProducts(item.id, item.name, item.price ,item.description, item.avatar, false)} color="danger" size="sm" className="btn-pill">Xóa bỏ</Button>
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
                <Input style={{ marginBottom: 30 }} type="text" placeholder="Tên sản phẩm..." onChange={this.handleChange('stt')} value={name ? name : ''} />
                <Label htmlFor="price">Giá dịch vụ</Label>
                <Input style={{ marginBottom: 30 }} type="text" placeholder="Giá sản phẩm..." onChange={this.handleChange('price')} value={price ? price : ''} />
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

export default FlowerProducts;
