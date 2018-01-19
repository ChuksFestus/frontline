import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import Main from '../Main';

const UserRoute = ({ isAuthenticated, component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated ? <Main component={<Component />} /> : <Redirect to="/" />
    }
  />
);

UserRoute.propTypes = {
  component: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
};

// function mapStateToProps(state) {
//   return {
//     isAuthenticated: !!state.user.token
//   };
// }

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.user.token
  };
}
export default connect(mapStateToProps)(UserRoute);
