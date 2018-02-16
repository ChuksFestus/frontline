import React from "react";
import axios from "axios";
import { Button, Form, Grid, Image } from "semantic-ui-react";
import "./LoginPage/login.css";

const BASEURL = "http://acciapi.ml/";

export default class RestPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: this.props.match.params.token,
      password: "",
      confirmPassword: ""
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onSubmit = e => {
    e.preventDefault();
    axios.put(`${BASEURL}api/v1/change`, {
      token: this.token,
      password: this.password,
      confirmPassword: this.confirmPassword
    });
  };

  render() {
    return (
      <React.Fragment>
        <div className="login-form">
          <Grid
            textAlign="center"
            style={{ height: "100%" }}
            verticalAlign="middle"
          >
            <Grid.Column style={{ maxWidth: 450 }}>
              <Image
                style={{ marginBottom: 20 }}
                verticalAlign="middle"
                src="http://www.accinigeria.com/wp-content/uploads/2017/10/ACCIHD2-2.png"
              />
              <Form onSubmit={this.onSubmit} size="large">
                <Form.Field>
                  <input
                    placeholder="New password"
                    name="password"
                    onChange={this.onChange}
                    type="password"
                    value={this.state.password}
                  />
                </Form.Field>
                <Form.Field>
                  <input
                    name="confirmPassword"
                    placeholder="confirm password"
                    onChange={this.onChange}
                    value={this.state.confirmPassword}
                    type="password"
                  />
                </Form.Field>

                <Button color="teal" fluid size="large" type="submit">
                  Submit
                </Button>
              </Form>
            </Grid.Column>
          </Grid>
        </div>
      </React.Fragment>
    );
  }
}
