/**
 * Created by root on 16/05/2017.
 */
import React from 'react';
import ReactDOM from 'react-dom';
// import { BrowserRouter as Router, Route } from 'react-router-dom';
// import { browserHistory } from 'react-router';
import { Menu, Icon, Row, Col } from 'antd';

// import HomePage from './containers/HomePage.jsx';
import UserInfoPage from './containers/UserInfoPage.jsx';
import RoleInfoPage from './containers/RoleInfoPage.jsx';

import Cookie from './modules/Cookie.js';

import './index.css';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class HomePage11 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 'dashboard'
    };
  }

  componentWillMount () {
    if (!Cookie.isUserAuthenticated()) {
      window.location.href = 'http://localhost:8080/power/src/login.html';
    }
  }

  handleClick = (e) => {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
  }

  render () {
    return (
      <div>
        <Row>
          <Col span={24}>
            <Menu
              onClick={this.handleClick}
              selectedKeys={[this.state.current]}
              mode="horizontal"
            >
              <Menu.Item key="dashboard">
                <Icon type="home" />Dashboard
              </Menu.Item>
              <Menu.Item key="organization">
                <Icon type="appstore-o" />组织机构管理
              </Menu.Item>
              <Menu.Item key="userInfo">
                <Icon type="user" />用户管理
              </Menu.Item>
              <Menu.Item key="roleInfo">
                <Icon type="team" />角色管理
              </Menu.Item>
              <Menu.Item key="resource">
                <Icon type="switcher" />资源管理
              </Menu.Item>
              <Menu.Item key="resourceHandler">
                <Icon type="schedule" />资源处理器
              </Menu.Item>
              <Menu.Item key="permission">
                <Icon type="lock" />权限管理
              </Menu.Item>
              <Menu.Item key="app" disabled>
                <Icon type="appstore" />Navigation Two
              </Menu.Item>
              <SubMenu title={<span><Icon type="setting" />Navigation Three - Submenu</span>}>
                <MenuItemGroup title="Item 1">
                  <Menu.Item key="setting:1">Option 1</Menu.Item>
                  <Menu.Item key="setting:2">Option 2</Menu.Item>
                </MenuItemGroup>
                <MenuItemGroup title="Item 2">
                  <Menu.Item key="setting:3">Option 3</Menu.Item>
                  <Menu.Item key="setting:4">Option 4</Menu.Item>
                </MenuItemGroup>
              </SubMenu>
              <Menu.Item key="alipay">
                <a href="https://ant.design" target="_blank" rel="noopener noreferrer">Navigation Four - Link</a>
              </Menu.Item>
            </Menu>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <UserInfoPage />
          </Col>
        </Row>
      </div>
    );
  }
}

ReactDOM.render(<HomePage11 />, document.getElementById('root'));
