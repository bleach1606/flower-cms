import React, { Component } from 'react';
import { Button, Card, CardBody, CardHeader, Col, Row, Table, Spinner } from 'reactstrap';
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import serviceCategory from '../../services/category';

class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categorys: [],
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
      const data = await serviceCategory.getListCategory();
      this.setState({
        categorys: data.data,
        isLoading: false
      })
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const { categorys, isLoading } = this.state;
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" lg="12">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Danh sách danh mục
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
                          <th>Tên danh mục</th>
                          <th>Avatar</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          categorys.length ?
                            categorys.map(category => {
                              return (
                                <tr key={category.id}>
                                  <td>{category.id}</td>
                                  <td>{category.name}</td>
                                  <td>{category.avatar ? <img src={ "http://127.0.0.1:8080/public/download/" + category.avatar + ".png"} style={{ objectFit: 'cover', objectPosition: "center", width: 50, height: 50, borderRadius: "50%" }} className="img-avatar" alt="avatar" /> : ''}</td>
                                  <td>
                                    <Link to={`/category/find-by-id/${category.id}`}>
                                      <Button color="info" size="sm" className="btn-pill">Chi tiết</Button>
                                    </Link>
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

export default Category;
