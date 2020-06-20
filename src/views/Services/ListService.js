import React, { Component } from 'react';
import { Input, Modal, Label, ModalBody, ModalHeader, ModalFooter, Button, Card, CardBody, CardHeader, Col, Row, Table, Spinner } from 'reactstrap';
import { AppSwitch } from '@coreui/react';
import { Link } from "react-router-dom";
import moment from 'moment-timezone';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GetService from "../../services/service";
import Utils from "../../services/utils";

class listService extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listServices: [],
      name: '',
      idListService: '',
      avatarService: '',
      isActive: '',
      stt: '',
      isLoading: true,
      openEditListService: false,
      openAddListServices: false,
      openDeleteListService: false,
      isLoadingEditListServices: false,
      isLoadingAddListServices: false,
      isLoadingDeleteListServices: false
    }
  }

  componentDidMount = async () => {
    await this.getListService();
  }

  openEditListService = (idListService, name, stt) => {
    this.setState({
      openEditListService: !this.state.openEditListService,
      idListService,
      name,
      stt
    })
  }

  openAddListServices = () => {
    this.setState({
      openAddListServices: !this.state.openAddListServices
    })
  }

  openDeleteListService = (idListService) => {
    this.setState({
      openDeleteListService: !this.state.openDeleteListService,
      idListService
    })
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    })
  }

  fileChangedHandler = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData()
    formData.append(
      'image',
      file,
      file.name
    )
    const response = await Utils.uploadSingleFile(formData);
    this.setState({
      avatarService: response.fileUrl
    })
  }

  getListService = async () => {
    try {
      const data = await GetService.getListService();
      this.setState({
        listServices: data,
        parentCategory: null,
        isLoading: false
      })
    } catch (error) {
      console.log(error);
    }
  }

  editListServices = async () => {
    const { name, avatarService, stt } = this.state;
    if (!name || !stt) {
      this.showNotification("Vui lòng điền đầy đủ thông tin!");
      return;
    }
    this.setState({
      isLoadingEditListServices: true
    })

    try {
      const data = {
        name,
        isActive: true,
        parentCategory: null,
        avatar: avatarService,
        stt: Number(stt)
      }
      await GetService.editListServices(this.state.idListService, data);
      this.setState({
        openEditListService: false,
        isLoadingEditListServices: false,
      }, () => {
        window.location.reload();
      })
    } catch (error) {
      console.log(error);
      this.showNotification(error.response.data.message);
      this.setState({
        openEditListService: false,
        isLoadingEditListServices: false
      })
    }
  }

  addListServices = async () => {
    const { name, isActive, avatarService, stt } = this.state;
    if (!name || isActive === '' || !stt) {
      this.showNotification("Vui lòng điền đầy đủ thông tin!");
      return;
    }
    this.setState({
      openAddListServices: true,
      isLoadingAddListServices: true
    })

    try {
      const data = {
        name,
        isActive: Boolean(isActive === 'true'),
        parentCategory: null,
        avatar: avatarService || null,
        stt: Number(stt)
      }
      await GetService.addListServices(data);
      this.setState({
        openAddListServices: false,
        isLoadingAddListServices: false,
      }, () => {
        window.location.reload();
      })
    } catch (error) {
      console.log(error);
      this.showNotification(error.response.data.message);
      this.setState({
        openAddListServices: false,
        isLoadingAddListServices: false
      })
    }
  }

  deleteListServices = async () => {
    this.setState({
      isLoadingDeleteListServices: true
    })

    try {
      await GetService.deleteListService(this.state.idListService);
      this.setState({
        openDeleteListService: false,
        isLoadingDeleteListServices: false,
      }, () => {
        window.location.reload();
      })
    } catch (error) {
      console.log(error);
      this.showNotification(error.response.data.message);
      this.setState({
        openDeleteListService: false,
        isLoadingDeleteListServices: false
      })
    }
  }

  changeActive = async (idListService, isActive) => {
    try {
      const data = {
        isActive
      }
      await GetService.editListServices(idListService, data);
      window.location.reload();
    } catch (error) {
      console.log(error);
      this.showNotification("Đã xảy ra lỗi, vui lòng thử lại sau");
    }
  }

  showNotification = (message) => {
    toast.error(message, {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 2000
    })
  }

  render() {
    const { listServices, name, stt, isLoading, openAddListServices, isLoadingAddListServices, openEditListService, isLoadingEditListServices, openDeleteListService, isLoadingDeleteListServices } = this.state;
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" lg="12">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Danh sách danh mục dịch vụ
              </CardHeader>
              {
                isLoading ?
                  <Spinner style={{ margin: '30px auto' }} color="dark" />
                  :
                  <CardBody>
                    <Table responsive striped>
                      <thead>
                        <tr>
                          <th>STT</th>
                          <th>Tên </th>
                          <th>Avatar</th>
                          <th>Ngày tạo</th>
                          <th>Trạng thái</th>
                          <th></th>
                          <th></th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          listServices.length ?
                            listServices.map(service => {
                              return (
                                <tr key={service.id}>
                                  <td>{service.stt}</td>
                                  <td>{service.name ? service.name : ""}</td>
                                  <td>{service.avatar ? <img src={service.avatar} style={{ objectFit: 'cover', objectPosition: "center", width: 50, height: 50, borderRadius: "50%" }} className="img-avatar" alt="avatar" /> : ''}</td>
                                  <td>{moment(service.createdAt).local().format('DD/MM/YYYY HH:mm')}</td>
                                  <td><AppSwitch className={'mx-1'} variant={'pill'} color={'primary'} checked={service.isActive} onChange={() => this.changeActive(service.id, !service.isActive)} /></td>
                                  <td>
                                    <Link to={`/list-service/item/${service.id}`}>
                                      <Button color="info" size="sm" className="btn-pill">Chi tiết</Button>
                                    </Link>
                                  </td>
                                  <td onClick={() => this.openEditListService(service.id, service.name, service.stt)} style={{ width: 50 }}><Button title="Chỉnh sửa thông tin danh mục dịch vụ" block color="link" className="btn-square"><i className="cui-pencil icons font-2xl d-block"></i></Button></td>
                                  <td style={{ width: 50 }}><Button onClick={() => this.openDeleteListService(service.id)} title="Xóa danh mục dịch vụ" block color="link" className="btn-square"><i className="cui-trash icons font-2xl d-block"></i></Button></td>
                                </tr>
                              )
                            }) : <tr><td style={{ textAlign: 'center' }} colSpan="3">Không có dữ liệu để hiển thị</td></tr>
                        }
                      </tbody>
                    </Table>
                    <div className="clearfix">
                      <Button color="primary" className="float-right" onClick={this.openAddListServices}><i className="fa fa-dot-circle-o"></i> Thêm danh mục dịch vụ</Button>
                    </div>
                  </CardBody>
              }
            </Card>
            <Modal isOpen={openAddListServices} toggle={this.openAddListServices}>
              <ModalHeader toggle={this.openAddListServices}>Thêm danh mục dịch vụ</ModalHeader>
              <ModalBody>
                <Input style={{ marginBottom: 30 }} type="number" placeholder="Số thứ tự..." onChange={this.handleChange('stt')} />
                <Input style={{ marginBottom: 30 }} type="text" placeholder="Tên dịch vụ..." onChange={this.handleChange('name')} />
                <Input style={{ marginBottom: 30 }} type="select" onChange={this.handleChange('isActive')} name="select" id="select">
                  <option value="">Trạng thái</option>
                  <option value={true}>Hoạt động</option>
                  <option value={false}>Không hoạt động</option>
                </Input>
                <Label htmlFor="name">Ảnh đại diện nhóm dịch vụ</Label>
                <Input style={{ marginBottom: 30 }} type="file" onChange={this.fileChangedHandler} accept="image/x-png,image/gif,image/jpeg" />
              </ModalBody>
              <ModalFooter>
                {
                  isLoadingAddListServices ? <Button disabled color="primary">...Loading</Button> : <Button color="primary" onClick={this.addListServices}>Xác nhận</Button>
                }
                <Button color="secondary" onClick={this.openAddListServices}>Cancel</Button>
              </ModalFooter>
            </Modal>
            <Modal isOpen={openEditListService} toggle={this.openEditListService}>
              <ModalHeader toggle={this.openEditListService}>Chỉnh sửa danh mục dịch vụ</ModalHeader>
              <ModalBody>
                <Label htmlFor="stt">Số thứ tự</Label>
                <Input style={{ marginBottom: 30 }} type="number" placeholder="Số thứ tự..." onChange={this.handleChange('stt')} value={stt ? stt : ''} />
                <Label htmlFor="name">Tên nhóm dịch vụ</Label>
                <Input style={{ marginBottom: 30 }} type="text" placeholder="Tên danh mục dịch vụ..." onChange={this.handleChange('name')} value={name ? name : ''} />
                <Label htmlFor="name">Ảnh đại diện nhóm dịch vụ</Label>
                <Input style={{ marginBottom: 30 }} type="file" onChange={this.fileChangedHandler} accept="image/x-png,image/gif,image/jpeg" />
              </ModalBody>
              <ModalFooter>
                {
                  isLoadingEditListServices ? <Button disabled color="primary">...Loading</Button> : <Button color="primary" onClick={this.editListServices}>Xác nhận</Button>
                }
                <Button color="secondary" onClick={this.openEditListService}>Cancel</Button>
              </ModalFooter>
            </Modal>
            <Modal isOpen={openDeleteListService} toggle={this.openDeleteListService}>
              <ModalHeader toggle={this.openDeleteListService}>Xóa danh mục dịch vụ</ModalHeader>
              <ModalBody>
                <p>Bạn chắc chắn muốn thực hiện hành động này ?</p>
              </ModalBody>
              <ModalFooter>
                {
                  isLoadingDeleteListServices ? <Button disabled color="primary">...Loading</Button> : <Button color="primary" onClick={this.deleteListServices}>Xác nhận</Button>
                }
                <Button color="secondary" onClick={this.openDeleteListService}>Cancel</Button>
              </ModalFooter>
            </Modal>
          </Col>
        </Row>
        <ToastContainer />
      </div>
    );
  }
}

export default listService;