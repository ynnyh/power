import Login from '../components/login/NormalLoginForm.jsx';
import Home from '../containers/HomePage.jsx';

import Auth from '../modules/Auth';

const routes = {
  // base component (wrapper for the whole application).
  childRoutes: [
    {
      path: '/',
      getComponent: (location, callback) => {
        if (Auth.isUserAuthenticated()) {
          callback(null, Home);
        } else {
          callback(null, Login);
        }
      }
    },

    {
      path: '/login',
      component: Login
    },

    {
      path: '/logout',
      onEnter: (nextState, replace) => {
        Auth.deauthenticateUser();

        // change the current URL to /
        replace('/');
      }
    }
  ]
};

export default routes;
