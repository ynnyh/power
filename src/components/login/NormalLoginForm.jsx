import React from 'react';
import { DatePicker, Row, Col, Form, Icon, Input, Button, Checkbox } from 'antd';

import { createBrowserHistory } from 'history';

import Origin from '../../modules/Origin';
import Cookie from '../../modules/Cookie';

const FormItem = Form.Item;
const history = createBrowserHistory();

class NormalLoginForm extends React.Component {
  /**
   * 构造器
   */
  constructor (props) {
    super(props);
      
    this.state = {
      errors: {},
      user: {
        account: '',
        password: '',
        captcha: ''
      },
      origin: {
        captchaUrl: Origin.captchaUrl(),
        loginUrl: Origin.loginUrl()
      }
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);

        // create an request
        const xhr = new XMLHttpRequest()
        let data = 'username=' + values.userName + '&password=' + values.password + '&grant_type=password';
        const isLoginPage = window.location.href.indexOf('login') !== -1;
        const flag = Cookie.existCookie('access_token');
        if (isLoginPage) {
          if (flag) {
            console.log('>>> redirect to home...');
            window.location.href = "http://localhost:8080/esp-pms-webapp/src/home.html";
          }
        } else {
          if (flag) {
            console.log('>>> use Authorization: Bearer ' + Cookie.getCookie('access_token'));
            xhr.setRequestHeader("Authorization", 'Bearer ' + Cookie.getCookie('access_token'));
          } else {
            console.log('>>> use grant_type: refresh_token');
            data = 'grant_type=refresh_token';
          }
        }

        xhr.onload = function () {
          if (xhr.status === 200) {
            let resp = xhr.response;
            if (typeof resp === 'string')
              resp = JSON.parse(resp);

//xhr.response: {"access_token":"b38ca0f9-b550-4d17-b214-8217870aefdd","token_type":"bearer","expires_in":3038,"scope":"bar read write","organization":"tomieFA"}
            console.log('>>> access_token : ' + resp.access_token);

            // 过期时间
            const expireDate = new Date(new Date().getTime() + (1000 * resp.expires_in));
            // 将token保存到cookie中，并设置过期时间
            Cookie.setCookie('access_token', resp.access_token, expireDate);

            // 组件外部跳转
            window.location.href = "http://localhost:8080/esp-pms-webapp/src/login.html";
          } else {
            console.log('>>> xhr response status is not 200. Status is ' + xhr.status + '. And the response is: ' + xhr.response);
          }
        };
        try {
          xhr.open('post', '/oauth/token', true);
          xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
          xhr.setRequestHeader('charset', 'utf-8');
          xhr.responseType = 'json';
          xhr.send(data);
        } catch (e){
          console.log('>>> xhr send occur error. Error info is: ' + e.message);
        }
      }
    });
  }
  
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
    <Row align='middle'>
      <Col span={8} offset={8}>
        <div style={{ margin: 80 }}>
          <h1>ESP PMS</h1>
          <br/>
          <Form onSubmit={this.handleSubmit} className="login-form">
            <FormItem>
              {getFieldDecorator('userName', {
                rules: [{ required: true, message: 'Please input your username!' }],
              })(
                <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="Username" />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: 'Please input your Password!' }],
              })(
                <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="Password" />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('remember', {
                valuePropName: 'checked',
                initialValue: true,
              })(
                <Checkbox>Remember me</Checkbox>
              )}
              <a className="login-form-forgot" href="">Forgot password</a>
              <br/>
              <Button type="primary" htmlType="submit" className="login-form-button">
                Log in
              </Button>
            </FormItem>
          </Form>
        </div>
      </Col>
    </Row>
    );
  }
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);

export default WrappedNormalLoginForm;
