import React from "react";
import { Button, Form, Grid, Message } from "semantic-ui-react";
import validator from "validator";
import PropTypes from "prop-types";

import InlineError from "../../components/messages/InlineError";

class ForgotPasswordForm extends React.Component {
  state = {
    data: {
      email: ""
    },
    loading: false,
    errors: {}
  };

  onChange = e =>
    this.setState({
      ...this.state,
      data: { ...this.state.data, [e.target.name]: e.target.value }
    });

  onSubmit = () => {
    const errors = this.validate(this.state.data);
    this.setState({ errors });
    console.log("state", this.state.data);
    if (Object.keys(errors).length === 0) {
      this.setState({ loading: true });
      this.props.submit(this.state.data);
      this.setState({ loading: false });
      // .catch(error => {
      //   if (error.response) {
      //     // console.log(error.response.data)
      //     this.setState({ errors: error.response.data, loading: false });
      //   }
      // });
    }
  };

  validate = data => {
    const errors = {};
    if (!validator.isEmail(data.email)) errors.email = "invalid email";
    return errors;
  };

  render() {
    const { errors, data, loading } = this.state;

    return (
      <Form size="large" onSubmit={this.onSubmit} loading={loading}>
        {errors.err && (
          <Message negative>
            <Message.Header>{errors.err}</Message.Header>
          </Message>
        )}
        <Form.Field error={!!errors.email}>
          {/* <label htmlFor="email">Email</label> */}
          <input
            type="email"
            id="email"
            name="email"
            placeholder="email"
            value={data.email}
            onChange={this.onChange}
          />
          {errors.email && <InlineError text={errors.email} />}
        </Form.Field>
        <Button color="teal" fluid size="large">
          ForgotPasswordForm
        </Button>
      </Form>
    );
  }
}

ForgotPasswordForm.propTypes = {
  submit: PropTypes.func.isRequired
};

export default ForgotPasswordForm;
