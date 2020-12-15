import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row, Spinner } from 'reactstrap';
import AccountService from "../../../services/account";
import logo from '../../../assets/img/brand/logo.png';
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: "",
      error: "",
      isLoading: false,
      redirect: Boolean(localStorage.getItem('username') && localStorage.getItem('token'))
    }
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    })
  }

  login = async () => {
    const { username, password } = this.state;
    if (!username || !password) {
      this.setState({
        error: '* Vui lòng điền đầy đủ thông tin'
      })
      return;
    }
    this.setState({
      isLoading: true
    }, async () => {
      try {
        await AccountService.login(username, password);
        this.setState({
          isLoading: false,
          redirect: true
        })
      } catch (error) {
        let message = error.response.data.message;
        this.setState({
          isLoading: false,
          error: message
        })

        // let message = error.response.data.message;
      }
    })
  }
  render() {
    const { isLoading, redirect, error } = this.state;
    if (redirect) {
      return <Redirect to="/" />
    }
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Form>
                      <h1>Đăng nhập</h1>
                      <p className="text-muted">Đăng nhập bằng tài khoản được cấp của bạn</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input onChange={this.handleChange('username')} type="text" placeholder="Username" autoComplete="username" />
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input onChange={this.handleChange('password')} type="password" placeholder="Password" autoComplete="current-password" />
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          {
                            isLoading ?
                              <Spinner color="primary" /> :
                              <Button onClick={this.login} color="primary" className="px-4">Đăng nhập</Button>
                          }
                        </Col>
                        <Col xs="12" className="text-left">
                          <p style={{ marginTop: 20 }} className="text-danger"> {error}.</p>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
                <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                  <CardBody className="text-center">
                    <div>
                      <img style={{ width: "80%", height: "auto" }} src={logo} alt="CAMELIA"></img>
                    </div>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Login;
