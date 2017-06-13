/**
 * Created by quhui on 14/05/2017.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { browserHistory } from 'react-router';

import Cookie from './modules/Cookie.js';

import './index.css';

class App extends React.Component {
  componentWillMount () {
    // console.log('>> 开始进行组件渲染，此处处理业务逻辑...');
    if (!Cookie.isUserAuthenticated()) {
      window.location.href = 'http://localhost:8080/power/src/login.html';
    } else {
      window.location.href = 'http://localhost:8080/power/src/home.html';
    }
  }
  render () {
    return (
      <label></label>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
