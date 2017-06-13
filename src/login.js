/**
 * Created by root on 14/05/2017.
 */

import React from 'react';
import ReactDOM from 'react-dom';

import Login from './components/login/NormalLoginForm.jsx';

import './index.css';

class LoginPage extends React.Component {
  render () {
    return (
      <Login/>
    );
  }
}

ReactDOM.render(<LoginPage />, document.getElementById('root'));
