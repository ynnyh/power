import React from 'react';
import { Row, Col } from 'antd';
import { createBrowserHistory } from 'history';

import Cookie from '../modules/Cookie.js';

const history = createBrowserHistory();

class HomePage extends React.Component {
  componentWillMount () {
    console.log('>> 开始进行组件渲染，此处处理业务逻辑...');
    if (!Cookie.isUserAuthenticated()) {
      window.location.href = 'http://localhost:8080/power/src/login.html';
    } else {
      // const xhr = new XMLHttpRequest();
      // xhr.open('GET', 'http://localhost:8081/foos/1', true);
      // xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded;charset=utf-8');
      // xhr.setRequestHeader('Authorization', 'Bearer ' + Cookie.getToken());
      // xhr.onreadystatechange = function (oEvent) {
      //   if (xhr.readyState === 4) {
      //     if (xhr.status === 200) {
      //       console.log(xhr.responseText);
      //     } else {
      //       console.log('Error', xhr.statusText);
      //     }
      //   }
      // };
      // xhr.send(null);
    }
  }
  render () {
    return (
      <Row align='middle'>
        <Col span={8} offset={8}>
          <div style={{ margin: 80 }}>
            <h1>ESP PMS</h1>
            <br/>
            HomePage...
          </div>
        </Col>
      </Row>
    );
  }
}

export default HomePage;
