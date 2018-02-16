import React, { Component } from "react";
import {
  Tab,
  Dimmer,
  Loader,
  Segment,
  Divider,
  Icon,
  Grid,
  Label
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import Button from "semantic-ui-react/dist/commonjs/elements/Button/Button";
import { Redirect, withRouter } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
import { update } from "../../actions/auth";
import { paths } from "../../data/registrationPages";

const BASEURL = "http://acciapi.ml/";
// const BASEURL = 'https://2968008f.ngrok.io/'

// const panes = [
//   {
//     menuItem: 'CATEGORY A - GOLD MEMBERS',
//     render: () => (
//       <Tab.Pane
//         style={{
//           textAlign: 'center',
//         }}
//       >
//         <Image
//           style={{ marginBottom: 20, marginLeft: '10%', marginTop: 30 }}
//           verticalAlign="middle"
//           src="http://www.accinigeria.com/wp-content/uploads/2017/10/ACCIHD2-2.png"
//         />
//         <Message
//           color="orange"
//           icon="checkmark"
//           header="N350,000/N50,000"
//           content="recomended"
//         />
//         <h3>BENEFITS</h3>
//         <p>Can vote and be voted for</p>
//         <p>
//           Advocacy roles on company’s related issues with the government
//           Priority
//         </p>
//         <p>
//           provision during all chamber’s activities/services as the case may be
//         </p>
//         <p>
//           20 per cent discount on space participation at Annual Abuja
//           International
//         </p>
//         <p>
//           Trade Fair Glass/ Crystal Membership certificate Freebies ( Scarf,
//           Cufflinks, Tie Pins, Customised Chamber’s Shirt)
//         </p>
//         <p>
//           Direct link to company’s website from the official chamber’s webpage.
//         </p>
//       </Tab.Pane>
//     ),
//   },
//   {
//     menuItem: 'CATEGORY B - SILVER MEMBERS',
//     render: () => (
//       <Tab.Pane
//         style={{
//           textAlign: 'left',
//         }}
//       >
//         <Image
//           style={{ marginBottom: 20, marginLeft: '10%', marginTop: 30 }}
//           verticalAlign="middle"
//           src="http://www.accinigeria.com/wp-content/uploads/2017/10/ACCIHD2-2.png"
//         />
//         <Message header="N350,000/N50,000" />
//         <h3>BENEFITS</h3>
//         <p>Can vote and be voted for</p>
//         <p>
//           Advocacy roles on company’s related issues with the government
//           Priority
//         </p>
//         <p>
//           provision during all chamber’s activities/services as the case may be
//         </p>
//         <p>
//           20 per cent discount on space participation at Annual Abuja
//           International
//         </p>
//         <p>
//           Trade Fair Glass/ Crystal Membership certificate Freebies ( Scarf,
//           Cufflinks, Tie Pins, Customised Chamber’s Shirt)
//         </p>
//         <p>
//           Direct link to company’s website from the official chamber’s webpage.
//         </p>
//       </Tab.Pane>
//     ),
//   },
//   {
//     menuItem: 'CATEGORY C - BRONZE MEMBERS',
//     render: () => (
//       <Tab.Pane
//         style={{
//           textAlign: 'center',
//         }}
//       >
//         <Message header="N350,000/N50,000" color="yellow" />
//         <h3>BENEFITS</h3>
//         <p>Can vote and be voted for</p>
//         <p>
//           Advocacy roles on company’s related issues with the government
//           Priority
//         </p>
//         <p>
//           provision during all chamber’s activities/services as the case may be
//         </p>
//         <p>
//           20 per cent discount on space participation at Annual Abuja
//           International
//         </p>
//         <p>
//           Trade Fair Glass/ Crystal Membership certificate Freebies ( Scarf,
//           Cufflinks, Tie Pins, Customised Chamber’s Shirt)
//         </p>
//         <p>
//           Direct link to company’s website from the official chamber’s webpage.
//         </p>
//       </Tab.Pane>
//     ),
//   },
//   {
//     menuItem: 'CATEGORY D - BRASS MEMBERS',
//     render: () => (
//       <Tab.Pane
//         style={{
//           textAlign: 'center',
//         }}
//       >
//         <Image
//           style={{ marginBottom: 20, marginLeft: '10%', marginTop: 30 }}
//           verticalAlign="middle"
//           src="http://www.accinigeria.com/wp-content/uploads/2017/10/ACCIHD2-2.png"
//         />
//         <Message header="N350,000/N50,000" color="brown" />
//         <h3>BENEFITS</h3>
//         <p>Can vote and be voted for</p>
//         <p>
//           Advocacy roles on company’s related issues with the government
//           Priority
//         </p>
//         <p>
//           provision during all chamber’s activities/services as the case may be
//         </p>
//         <p>
//           20 per cent discount on space participation at Annual Abuja
//           International
//         </p>
//         <p>
//           Trade Fair Glass/ Crystal Membership certificate Freebies ( Scarf,
//           Cufflinks, Tie Pins, Customised Chamber’s Shirt)
//         </p>
//         <p>
//           Direct link to company’s website from the official chamber’s webpage.
//         </p>
//       </Tab.Pane>
//     ),
//   },
// ]

const state = { activeIndex: 0 };

// const benefits = [
//   `
// Can vote and be voted for.
// Priority provision during chamber activities.
// Advocacy roles on related issues on behalf of the company with government.
// Entitled to first advantage on ALL chamber’s activities/services as the case may be.
// 20 per cent discount on space participation at the Annual Abuja International Trade Fair
// or/and on any Foreign Trade Missions.
// Glass/ Crystal Membership Certificate.
// Right of Choice on selected chamber’s activities/ programmes.
// Freebies (Scarf, Cufflinks, Tie Pins, Customised Chamber’s Shirt).
// Direct link to company’s website from the official chamber’s webpage.`,
//   `
// Can vote and be voted for.
// Advocacy roles on company’s related issues with the government.
// Priority provision during ALL chamber’s activities/services as the case may be.
// 20 per cent discount on space participation at Annual Abuja International Trade Fair
// Glass/ Crystal Membership certificate
// Freebies ( Scarf, Cufflinks, Tie Pins, Customised Chamber’s Shirt)
// Direct link to company’s website from the official chamber’s webpage.`,
//   `Can vote but cannot be voted for.
// Special provision during chamber’s activities/ services as the case may be.
// 10 per cent discount on space participation at Annual Abuja International Trade Fair.
// Membership Certificate.
// Freebies (Scarf, Cufflinks, Tie Pins and Customised Chamber’s Shirt).`,
// ]

// const getDescription =

class ContReg2 extends Component {
  state = {
    plans: [],
    loading: false
  };
  componentDidMount() {
    const { user } = this.props;
    const { recommendedLevel } = user;
    axios(`${BASEURL}api/v1/levels/`, {
      headers: {
        authorization: user.token
      }
    }).then(response => {
      console.log("plans", response);
      const plans = response.data.map(
        ({ description, fee, name, paystack: { data: { plan_code } } }, i) => ({
          render: () => (
            <React.Fragment>
              {/* <h1 className="encode-font">{description.replace('<br>', '')}</h1> */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  width: "60%",
                  border: "1px solid #ddd",
                  borderRadius: "2rem",
                  padding: "2rem 0px"
                }}
              >
                <div
                  style={{
                    marginBottom: "0.5rem"
                  }}
                >
                  {name === recommendedLevel && (
                    <Label as="a" color="blue" tag>
                      Recommended
                    </Label>
                  )}
                </div>
                <h2
                  className="encode-font"
                  style={{
                    width: "100%",
                    textTransform: "capitalize",
                    backgroundColor: "#D4AF37",
                    color: "#fff",
                    fontWeight: "900",
                    textAlign: "center",
                    padding: "1rem"
                  }}
                >
                  N{(fee + "")
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
                    .join("")}
                </h2>
                <h3>BENEFITS</h3>
                <div style={{ padding: "1rem" }}>
                  {description.split("\n").map(benefit => (
                    <React.Fragment>
                      <div style={{ display: "flex" }}>
                        <Icon name="checkmark" />
                        <p>{benefit}</p>
                      </div>
                      <Divider />
                    </React.Fragment>
                  ))}
                  {/* {benefits[i]
                    .split('\n')
                    .filter(v => v)
                    .map(benefit => (
                      <React.Fragment>
                        <div style={{ display: 'flex' }}>
                          <Icon name="checkmark" />
                          <p>{benefit}</p>
                        </div>
                        <Divider />
                      </React.Fragment>
                    ))} */}
                </div>
              </div>
            </React.Fragment>
          ),
          menuItem: name,
          plan_code,
          description,
          fee,
          name
        })
      );
      this.setState(prevState => ({ ...prevState, plans }));
      // console.log(plans)
    });

    // this.setState()
  }
  render() {
    const { user, location: { pathname } } = this.props;
    const { recommendedLevel } = user;
    if (user.regState == null) return <Redirect to="/login" />;
    const index = paths.indexOf(pathname);
    const regState = user.regState;
    console.log("cont2", regState);
    if (regState < index) {
      return <Redirect to={paths[regState]} />;
    }
    return (
      <React.Fragment>
        <div
          style={{
            width: "70%",
            margin: "0 auto",
            border: "1px solid #C0C0C0",
            minHeight: "100%",
            verticalAlign: "middle",
            marginTop: "100px",
            marginBottom: 100,
            textAlign: "left",
            paddingBottom: 50
          }}
        >
          <h2 style={{ margin: 60, textAlign: "center" }}>
            Select a membership category
          </h2>
          {this.state.plans.length ? (
            <Tab
              defaultActiveIndex={this.state.plans.findIndex(
                ({ name }) => name === recommendedLevel
              )}
              menu={{ fluid: true, vertical: true, tabular: "right" }}
              panes={this.state.plans}
              onTabChange={(change, { activeIndex }) => {
                state.activeIndex = activeIndex;
                console.log(state);
              }}
              style={{
                borderLeft: "7px solid #D4AF37"
              }}
            />
          ) : (
            <Segment>
              <Dimmer active inverted>
                <Loader inverted>Loading</Loader>
              </Dimmer>
            </Segment>
          )}
          {/* <Button
          as={Link}
          to="/cont"
          style={{ marginLeft: '10%', marginTop: 50, marginRight: 30 }}
        >
          Back
        </Button> */}
          {this.state.loading && (
            <Segment>
              <Dimmer active inverted>
                <Loader inverted>Loading</Loader>
              </Dimmer>
            </Segment>
          )}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "3rem"
            }}
          >
            <Button
              // as={Link}
              // to={{
              //   pathname: '/cont3',
              //   state: {
              //     id: 'state.id',
              //   },
              // }}
              onClick={() => {
                const { history } = this.props;
                this.setState({ loading: true });
                this.props
                  .update(
                    {
                      membershipPlan: this.state.plans[state.activeIndex]
                        .plan_code,
                      regState: 2,
                      token: user.token
                    },
                    user.id
                  )
                  .then(() => {
                    this.setState({ loading: false });
                    history.push({
                      pathname: "/cont3"
                    });
                  });
                // axios
                //   .put(
                //     `${BASEURL}api/v1/user/${user.id}`,
                //     {
                //       membershipPlan: this.state.plans[state.activeIndex]
                //         .plan_code,
                //       //   fee: this.state.plans[state.activeIndex].fee,
                //       //   name: this.state.plans[state.activeIndex].name,
                //       //   description: this.state.plans[state.activeIndex]
                //       //     .description,
                //       // },
                //       regState: 2,
                //     },
                //     {
                //       headers: {
                //         authorization: user.token,
                //         'Content-Type': 'application/form-data',
                //         Accept: 'application/form-data',
                //       },
                //     }
                //   )
                //   .then(() => {
                //     history.push({
                //       pathname: '/cont3',
                //       state: {
                //         id: 'state.id',
                //       },
                //     })
                //   })
                //   .catch(console.log)
              }}
              className="btn"
            >
              Next
            </Button>
          </div>
        </div>
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
  connect(({ user }) => ({ user }), { update })(ContReg2)
);
