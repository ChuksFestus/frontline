import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';

import LandingPage from './Pages/LandingPage';
import LoginPage from './Pages/LoginPage/LoginPage';
import Home from './Pages/Home/Home';
import Profile2 from './Pages/Profile2';
import Project from './Pages/Project';
import Library from './Pages/Library';
import Discussions from './Pages/Discussion';
// import Payment from './Pages/Payment';
import UserRoute from './components/routes/UserRoute';
import GuestRoute from './components/routes/GuestRoute';
import SignUpPage from './Pages/SignUpPage/SignUpPage';
import ContReg from './Pages/contReg/ContReg';
import ContReg2 from './Pages/contReg/ContReg2';
import ForgotPassword from './Pages/ForgotPassword/ForgotPassword';
import Main from './components/Main';
import ContReg3 from './Pages/contReg/ContReg3';
import ContReg4 from './Pages/contReg/ContReg4';
import ContReg5 from './Pages/contReg/ContReg5';
import ContReg6 from './Pages/contReg/ContReg6';
import Payment from './Pages/Payment';
// import Home from './Pages/Home';

const App = ({ location }) => (
  <div>
    <Route location={location} path="/" exact component={LandingPage} />
    <Route exact path="/cont" component={ContReg} />
    <Route exact path="/cont2" component={ContReg2} />
    <Route exact path="/cont3" component={ContReg3} />
    <Route exact path="/cont4" component={ContReg4} />
    <Route exact path="/cont5" component={ContReg5} />
    <Route exact path="/cont6" component={ContReg6} />
    <Route exact path="/payment" component={Payment} />
    {/* <Route location={location} path='/login' exact component={LoginPage} /> */}
    <GuestRoute
      location={location}
      path="/signup"
      exact
      component={SignUpPage}
    />
    <GuestRoute
      location={location}
      path="/forgotpassword"
      exact
      component={ForgotPassword}
    />
    <GuestRoute location={location} path="/login" exact component={LoginPage} />
    <UserRoute location={location} path="/app" exact component={Home} />
    <UserRoute
      location={location}
      path="/app/profile/:friend"
      exact
      component={Profile2}
    />
    <UserRoute
      location={location}
      path="/app/project"
      exact
      component={Project}
    />
    <UserRoute
      location={location}
      path="/app/library"
      exact
      component={Library}
    />
    <UserRoute
      location={location}
      path="/app/payment"
      exact
      component={Payment}
    />
  </div>
);

App.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired
};

export default App;
