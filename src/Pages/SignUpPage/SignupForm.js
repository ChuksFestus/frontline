import React from "react";
import axios from "axios";
import { compose } from "redux";
import { connect } from "react-redux";
import { Button, Form, Grid, Image, Message } from "semantic-ui-react";
import { withRouter } from "react-router-dom";
import validator from "validator";
import PropTypes from "prop-types";

import InlineError from "../../components/messages/InlineError";
import "../LoginPage/login.css";
import { userRegistered } from "../../actions/auth";

const BASEURL = "http://acciapi.ml/";
// const BASEURL = 'https://2968008f.ngrok.io/'

class SignupForm extends React.Component {
  state = {
    data: {
      email: "",
      password: "",
      confirmPassword: ""
    },
    loading: false,
    errors: {}
  };

  signup = user =>
    axios
      .post(`${BASEURL}api/v1/user`, user, {
        headers: {
          "Content-Type": "application/form-data",
          Accept: "application/form-data"
        }
      })
      .then(response => {
        userRegistered(response.data);
      });

  onChange = e =>
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.value }
    });

  onSubmit = () => {
    const { history } = this.props;
    const errors = this.validate(this.state.data);
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      this.setState({ loading: true });
      // this.signup(this.state.data)
      //   .then(res => {
      //     console.log('success', res)
      //     history.push({
      //       pathname: '/cont',
      //       state: {
      //         id: res.data.id,
      //       },
      //     })
      //   })
      //   .catch(error => {
      //     if (error.response) {
      //       console.log(error.response.data)
      //       this.setState({ errors: error.response.data, loading: false })
      //     }
      //   })
      this.props.registerUser(this.state.data, history);
    }
  };

  validate = data => {
    const errors = {};
    if (!validator.isEmail(data.email)) errors.email = "invalid email";
    if (!data.password) errors.password = "please enter a password";
    return errors;
  };

  render() {
    const { data, errors, loading } = this.state;
    return (
      <Form size="large" onSubmit={this.onSubmit} loading={loading}>
        {errors.err && (
          <Message negative>
            <Message.Header>{errors.err.summary}</Message.Header>
          </Message>
        )}
        <Form.Input
          error={!!errors.email}
          fluid
          icon="user"
          iconPosition="left"
          placeholder="E-mail address"
          name="email"
          value={data.email}
          onChange={this.onChange}
        />
        {errors.email && <InlineError text={errors.email} />}
        <Form.Input
          error={!!errors.password}
          fluid
          icon="lock"
          iconPosition="left"
          placeholder="Password"
          type="password"
          name="password"
          value={data.password}
          onChange={this.onChange}
        />
        {errors.password && <InlineError text={errors.password} />}
        <Form.Input
          error={!!errors.password}
          fluid
          icon="lock"
          iconPosition="left"
          placeholder="Confirm Password"
          type="password"
          name="confirmPassword"
          value={data.confirmPassword}
          onChange={this.onChange}
        />
        <Button color="teal" fluid size="large">
          Signup
        </Button>
      </Form>
    );
  }
}

SignupForm.propTypes = {
  // submit: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  userRegistered: data => {
    userRegistered(data);
  }
});

export default withRouter(connect()(SignupForm));
