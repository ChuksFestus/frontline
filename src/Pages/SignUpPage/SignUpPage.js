import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { signup2 } from "../../actions/auth";
import { Message, Grid, Image, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";

import SignupForm from "./SignupForm";

class SignupPage extends React.Component {
  render() {
    return (
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

            <SignupForm registerUser={this.props.signup2} />
            <Message>
              already have an account?{" "}
              <Link to="/login" style={{ color: "var(--main-blue)" }}>
                Login
              </Link>
            </Message>
          </Grid.Column>
        </Grid>
        <Grid style={{ background: "#34495E", textAlign: "center" }}>
          <Grid.Column width="5">
            <h2 style={{ color: "#D5C67A", fontSize: "50px" }}>3215</h2>
            <h3 style={{ color: "white", marginTop: 5 }}>Registered Members</h3>
          </Grid.Column>
          <Grid.Column width="6" verticalAlign="middle">
            <Icon
              name="facebook square"
              size="big"
              style={{ color: "white" }}
            />
            <Icon name="linkedin" size="big" style={{ color: "white" }} />
            <Icon name="twitter" size="big" style={{ color: "white" }} />
          </Grid.Column>
          <Grid.Column width="5">
            <h3 style={{ color: "white" }}>Links</h3>
            <Link to="#" style={{ marginRight: 10 }}>
              ACCI website
            </Link>
            <Link to="#" style={{ marginRight: 10 }}>
              Membership Directory
            </Link>
            <Link to="#" style={{ marginRight: 10 }}>
              ACCI Events
            </Link>
            <Link to="#" style={{ marginRight: 10 }}>
              Shop on ACCI
            </Link>
          </Grid.Column>
        </Grid>
        <footer
          style={{
            verticalAlign: "middle",
            background: "white",
            color: "#656768",
            textAlign: "center",
            padding: "10px",
            fontWeight: "bold"
          }}
        >
          Copyright © 2018 Abuja Chamber of Commerce & Industry
        </footer>
      </div>
    );
  }
}

SignupPage.propTypes = {
  // history: PropTypes.shape({
  //   push: PropTypes.func.isRequired,
  // }).isRequired,
  login: PropTypes.func.isRequired
};

export default connect(null, { signup2 })(SignupPage);
