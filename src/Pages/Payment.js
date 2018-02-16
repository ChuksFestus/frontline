import React, { Component } from "react";
import { connect } from "react-redux";
import { Tab, Grid, Label, Segment, Card, Button } from "semantic-ui-react";
import axios from "axios";
//payments/memberships
const BASEURL = "http://acciapi.ml/";
// const BASEURL = 'https://2968008f.ngrok.io/'

class Payment extends Component {
  state = {
    memberships: [
      {
        id: "92u309239",
        createdAt: "Jan 21, 2018",
        amount: 20000
      }
    ]
  };
  renewMembership = () => {
    // const { user: { token, id }, post } = this.props
    console.log("Came to renew memberships");
    // axios(`${BASEURL}api/v1/userpayments/memberships/${id}`, {
    //   headers: {
    //     authorization: token,
    //   },
    // }).then(response => {
    //   this.setState(
    //     prevState => ({ ...prevState, ...response.data }),
    //     () => console.log(this.state)
    //   )
    //   console.log('payments', response.data)
    // })
  };
  componentDidMount() {
    const { user: { token, id } } = this.props;
    axios(`${BASEURL}api/v1/userpayments/memberships/${id}`, {
      headers: {
        authorization: token
      }
    }).then(response => {
      this.setState(
        prevState => ({ ...prevState, ...response.data }),
        () => console.log(this.state)
      );
      console.log("payments", response.data);
    });
  }
  render() {
    const memberships = this.state.memberships.map(obj => (
      <Tab.Pane attached={false}>
        <Grid>
          <Grid.Column>
            <Segment raised>
              <Label color="orange" ribbon="right">
                member id ({obj.id})
              </Label>
              <Grid>
                <Grid.Row>
                  <Grid.Column width="8">
                    <div>
                      <h3>Chukwu Nonso</h3>
                      <p>
                        Payed on<span
                          style={{ color: "#34495E", marginLeft: 30 }}
                        >
                          {obj.createdAt}
                        </span>
                      </p>
                      <p>
                        Amount<span
                          style={{ color: "#34495E", marginLeft: 30 }}
                        >
                          {obj.amount}
                        </span>
                      </p>
                    </div>
                  </Grid.Column>
                  <Grid.Column width="6">
                    <div>
                      <h3
                        style={{
                          color: "var(--main-gold)",
                          float: "right",
                          marginTop: 20
                        }}
                      >
                        Gold Membership Plan
                      </h3>
                    </div>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Segment>
          </Grid.Column>
        </Grid>
      </Tab.Pane>
    ));
    let renewal = "";
    if (this.state.memberships.length > 0) {
      renewal = (
        <Button
          style={{
            background: "var(--main-gold)",
            color: "var(--white)",
            width: "60%",
            margin: "0 auto",
            display: "table"
          }}
          onClick={this.renewMembership}
        >
          RENEW MEMBERSHIP
        </Button>
      );
    }
    const panes = [
      {
        menuItem: "Membership Renewal",
        render: () => (
          <div>
            {memberships}
            {renewal}
          </div>
        )
      },
      {
        menuItem: "(1) Total Subscriptions",
        render: () => (
          <Tab.Pane attached={false}>
            <Card fluid style={{ textAlign: "center", padding: 30 }}>
              <h3>MEMBERSHIP FEE AUTO-RENEWAL</h3>
              <p>subscribed on 20/09/2017</p>
              <Button
                style={{
                  background: "var(--main-gold)",
                  color: "var(--white)",
                  width: "40%",
                  margin: "0 auto"
                }}
              >
                UNSUBSCRIBE
              </Button>
            </Card>
          </Tab.Pane>
        )
      }
    ];
    return (
      <React.Fragment>
        <Grid>
          <div className="bana">PAYMENTS</div>
        </Grid>
        <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
      </React.Fragment>
    );
  }
}

export default connect(({ user }) => ({ user }), null)(Payment);
