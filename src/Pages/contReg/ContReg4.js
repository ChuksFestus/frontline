import React from 'react'
import { Grid, Segment, Form, Image, Button, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { update } from '../../actions/auth'
import { withRouter } from 'react-router-dom'
import api from '../../api'

class ContReg4 extends React.Component {
  state = {
    loading: false,
    data: {
      referrer1: null,
      referrer2: null,
    },
    // rep1 : {
    //   id : null,
    //   email : null
    // },
    // rep2 : {
    //   id : null,
    //   email : null
    // }
  }

  handleChange = (e, s) => {
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.value },
    })
  }

  // handleChange2 = (e) => {
  //   this.setState({
  //   rep2 : {...this.state.rep1, [e.target.name]: e.target.value}})
  // }

  submit = () => {
    // console.log(this.state)
    console.log(this.state)
    this.setState({ loading: true })
    const { history, user: { id, token } } = this.props

    console.log('cont', { ...this.state.data, token, regState: 4 })
    console.log('alert', {
      id,
      referrerUrl: 'http://acci.herokuapp.com/cont4',
      token,
    })
    api.signup
      .contreg({ ...this.state.data, token, regState: 4 }, id)
      .then(() => {
        history.push({
          pathname: '/cont5',
        })
      })
    // .then(() => {
    //   api.signup.alertReferee({
    //     id,
    //     referrerUrl: 'http://http://acci.herokuapp.com/cont4',
    //     token,
    //   })
    // })

    // this.props.update(
    //   { ...this.state.data, token, regState: 4 },
    //   history,
    //   '/regmessage',
    //   // '/cont5',
    //   id
    // ).then(() => {
    //   api.signup.alertReferee({
    //     id,
    //     referrerUrl: 'http://http://acci.herokuapp.com/cont4'
    //   })
    // })
    // .catch(() => {
    //   //handle error
    //   return Promise.resolve('')
    // })
    // .then(() => {
    //   this.setState({ loading: true })
    // })
  }

  validate = () => {
    // perform validation here
  }

  render() {
    return (
      <React.Fragment>
        <Form
          style={{
            width: '70%',
            margin: '0 auto',
            textAlign: 'center',
            height: '100%',
            minHeight: '50vh',
          }}
          loading={this.state.loading}
        >
          <h2>Please fill member id and email of two financial members</h2>
          <Grid columns="equal">
            <Grid.Column>
              <Form.Field>
                <Form.Input
                  type="email"
                  placeholder="email"
                  name="referrer1"
                  onChange={this.handleChange}
                />
              </Form.Field>
              <Form.Field>
                <Form.Input type="text" placeholder="membership id" />
              </Form.Field>
            </Grid.Column>
            <Grid.Column>
              <Grid.Column>
                <Form.Field>
                  <Form.Input
                    type="email"
                    placeholder="email"
                    name="referrer2"
                    onChange={this.handleChange}
                  />
                </Form.Field>
                <Form.Field>
                  <Form.Input type="text" placeholder="membership id" />
                </Form.Field>
              </Grid.Column>
            </Grid.Column>
          </Grid>
          <div style={{ marginTop: 30 }}>
            <Button to="/cont3" as={Link}>
              Back
            </Button>
            <Button className="btn" onClick={this.submit}>
              Next
            </Button>
          </div>
        </Form>
        <Grid style={{ background: '#34495E', textAlign: 'center' }}>
          <Grid.Column width="5">
            <h2 style={{ color: '#D5C67A', fontSize: '50px' }}>3215</h2>
            <h3 style={{ color: 'white', marginTop: 5 }}>Registered Members</h3>
          </Grid.Column>
          <Grid.Column width="6" verticalAlign="middle">
            <Icon
              name="facebook square"
              size="big"
              style={{ color: 'white' }}
            />
            <Icon name="linkedin" size="big" style={{ color: 'white' }} />
            <Icon name="twitter" size="big" style={{ color: 'white' }} />
          </Grid.Column>
          <Grid.Column width="5">
            <h3 style={{ color: 'white' }}>Links</h3>
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
            verticalAlign: 'middle',
            background: 'white',
            color: '#656768',
            textAlign: 'center',
            padding: '10px',
            fontWeight: 'bold',
          }}
        >
          Copyright © 2017 Abuja Chamber of Commerce & Industry
        </footer>
      </React.Fragment>
    )
  }
}

export default withRouter(
  connect(({ user }) => ({ user }), { update })(ContReg4)
)
