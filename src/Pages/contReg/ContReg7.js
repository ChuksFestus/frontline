import React from "react";
import axios from "axios";
import { Card, Grid, Dimmer, Loader, Segment, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import PaystackComponent from "../../components/PaystackComponent";
import { connect } from "react-redux";
import { update } from "../../actions/auth";
import { Redirect, withRouter } from "react-router-dom";
import { paths } from "../../data/registrationPages";

const BASEURL = "http://acciapi.ml/";

class ContReg7 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      plan: {
        due: "",
        paystack: {
          data: {
            plan_code: ""
          }
        },
        name: "",
        user: {
          email: ""
        }
      }
    };
    this.changeToNew = this.changeToNew.bind(this);
  }

  changeToNew() {
    const { history, user: { id, token } } = this.props;
    this.setState({
      loading: true
    });
    this.props
      .update(
        {
          regState: 7,
          token
        },
        id
      )
      .then(() => {
        console.log("going to 7");

        this.setState({
          loading: false
        });
        history.push({
          pathname: "/cont7",
          state: {
            id: id
          }
        });
      });

    // axios
    //   .put(
    //     `${BASEURL}api/v1/user/${id}`,
    //     {
    //       regState: 5,
    //     },
    //     {
    //       headers: {
    //         authorization: token,
    //       },
    //     }
    //   )
    //   .then(() => {
    //     this.setState({
    //       loading: false,
    //     })
    //     history.push({
    //       pathname: '/regmessage',
    //       state: {
    //         id: id,
    //       },
    //     })
    //   })
  }

  componentDidMount() {
    const { user } = this.props;

    axios(`${BASEURL}api/v1/user/${user.id}`, {
      headers: {
        authorization: user.token
      }
    })
      .then(({ data }) => {
        return Promise.all([
          data,
          axios(`${BASEURL}api/v1/levels/`, {
            headers: {
              authorization: user.token
            }
          })
        ]);
      })
      .then(results => {
        // const { membershipPlan } = results[0]
        const plans = results[1].data;

        const plan = plans.find(p => {
          return p.paystack.data.plan_code;
        });
        console.log(plan);
        this.setState(prevState => ({
          ...prevState,
          user: results[0],
          plan
        }));
      });
  }

  render() {
    const { user, location: { pathname } } = this.props;
    const { id, email } = user;

    if (user.regState == null) return <Redirect to="/login" />;
    const index = paths.indexOf(pathname);
    const regState = user.regState;
    if (regState < index) {
      return <Redirect to={paths[regState]} />;
    }
    const { plan } = this.state;
    plan &&
      console.log(
        plan.due,
        plan.paystack.data.plan_code,
        plan.name,
        user.email
      );
    // const { location: { state }, history } = this.props
    // console.log(this.props)
    // if (state == null || state.id == null) {
    //   history.push('/signup')
    //   return null
    // }
    const formattedFee =
      typeof plan === "object" && plan != null
        ? "N" +
          (plan.due + "")
            .split("")
            .reverse()
            .reduce(
              (acc, l, i, arr) =>
                i % 3 === 0 && i !== arr.length - 1 && i !== 0
                  ? `${acc},${l}`
                  : `${acc}${l}`,
              ""
            )
            .split("")
            .reverse()
            .join("")
        : "";

    return (
      <React.Fragment>
        <Grid
          textAlign="center"
          style={{ height: "100%", marginBottom: 50 }}
          verticalAlign="middle"
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Card style={{ padding: "20px", width: "100%" }}>
              <Grid.Column>Membership Plan</Grid.Column>
              <Grid.Column>
                <strong>&#x20A6;{plan.due}</strong>
              </Grid.Column>
              <div style={{ margin: "10px auto", marginTop: 40 }}>
                <PaystackComponent
                  variablename="Verfication "
                  amount={plan.due * 100}
                  callback={this.changeToNew}
                  email={email}
                  metadata={{
                    custom_fields: [
                      {
                        display_name: "Payment For",
                        variable_name: "membership",
                        value: "membership"
                      },
                      {
                        display_name: "Membership ID",
                        variable_name: "membership_id",
                        value: id
                      }
                    ]
                  }}
                />
              </div>
              {this.state.loading && (
                <Segment>
                  <Dimmer active inverted>
                    <Loader inverted>Loading</Loader>
                  </Dimmer>
                </Segment>
              )}
              {/* <Button
                className="btn"
                style={{ margin: '30px auto' }}
                to="/cont6"
                as={Link}
              >
                Proceed
              </Button> */}
            </Card>
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
      </React.Fragment>
    );
  }
}
export default withRouter(
  connect(({ user }) => ({ user }), { update })(ContReg7)
);
