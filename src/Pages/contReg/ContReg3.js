import React from 'react'
import axios from 'axios'
import { Grid, Form, Button, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { update } from '../../actions/auth'
import { connect } from 'react-redux'

import { Redirect, withRouter } from 'react-router-dom'
import { paths } from '../../data/registrationPages'

// const BASEURL = 'https://2968008f.ngrok.io/'

class ContReg3 extends React.Component {
  state = {
    loading: false,
    data: {
      companyRepName1: null,
      companyRepPhone1: null,
      companyRepEmail1: null,
      companyRepPassportUrl1: null,
      companyRepCVUrl: null,
      companyRepName2: null,
      companyRepPhone2: null,
      companyRepEmail2: null,
      companyRepPassportUrl2: null,
      companyRepCVUrl2: null,
      companyCOIUrl: null,
    },
  }

  // handleChange1 = e => {
  //   this.setState({
  //     rep1: { ...this.state.rep1, [e.target.name]: e.target.value },
  //   })
  // }

  handleChange = e => {
    const { target: { name } } = e
    const hasFile = [
      'companyRepPassportUrl1',
      'companyRepPassportUrl2',
      'companyRepCVUrl2',
      'companyCOIUrl',
      'companyRepCVurl',
    ]
    if (hasFile.indexOf(name) > -1) {
      const file = e.target.files[0]

      this.setState(
        {
          data: { ...this.state.data, [e.target.name]: file },
        },
        () => console.log(this.state.data)
      )
      return
    }
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.value },
    })
  }

  submit = () => {
    // console.log(this.state)
    if (!this.validate()) return
    // console.log('gotcha')
    // const { user: { token } } = this.props
    this.setState({ loading: true })
    const { history, user: { id, token } } = this.props

    const hasFile = [
      'companyRepPassportUrl1',
      'companyRepPassportUrl2',
      'companyRepCVUrl2',
      'companyCOIUrl',
      'companyRepCVurl',
    ]

    Promise.all(
      hasFile.map(name => {
        const form = new FormData()
        const data = this.state.data[name]
        if (data) {
          form.append('file', data)
        }
        // console.log(form)
        return data
          ? axios.post(
              `http://membership-api.accinigeria.com/api/v1/user/upload`,
              form,
              {
                headers: {
                  'Content-Type': 'application/form-data',
                  Accept: 'application/form-data',
                  authorization: token,
                },
              }
            )
          : Promise.resolve({ data: { bannerUrl: '' } })
      })
    )
      .then(res => {
        console.log(res)
        return this.props.update(
          {
            ...this.state.data,
            companyRepPassportUrl1: res[0].data.bannerUrl,
            companyRepPassportUrl2: res[1].data.bannerUrl,
            companyRepCVUrl2: res[2].data.bannerUrl,
            companyCOIUrl: res[3].data.bannerUrl,
            companyRepCVurl: res[4].data.bannerUrl,
            token,
            regState: 3,
          },
          id
        )
      })
      .then(() => {
        this.setState({ loading: false })
        history.push({
          pathname: '/cont4',
        })
      })
      .catch(() => {
        //handle error
        return Promise.resolve('')
      })
      .then(() => {
        this.setState({ loading: false })
      })

    // setTimeout(function() {
    //   window.location = '/cont4'
    // }, 3000)
  }

  validate = () => {
    // perform validation here
    // console.log(Object.values(this.state.data))

    const rep1 = [
      'companyRepName1',
      'companyRepPhone1',
      'companyRepEmail1',
      'companyRepPassportUrl1',
      'companyRepCVUrl2',
      'companyRepCVurl',
    ]
    const rep2 = [
      'companyRepName2',
      'companyRepPhone2',
      'companyRepEmail2',
      'companyRepPassportUrl2',
      'companyCOIUrl',
      'companyRepCVUrl2',
    ]
    let rep1Inputs = []
    let rep2Inputs = []

    const inputs = this.state.data

    for (let val in inputs) {
      if (rep1.indexOf(val) > -1) {
        rep1Inputs.push(inputs[val])
      } else if (rep2.indexOf(val) > -1) {
        rep2Inputs.push(inputs[val])
      }
    }

    return [
      rep1Inputs.some(val => val === null),
      rep2Inputs.some(val => val === null),
    ].some(val => val === false)
    // return
  }

  render() {
    const { user, location: { pathname } } = this.props
    if (user.regState == null) return <Redirect to="/login" />
    const index = paths.indexOf(pathname)
    const regState = user.regState
    console.log('cont3', regState)
    if (regState < index) {
      return <Redirect to={paths[regState]} />
    }
    return (
      <React.Fragment>
        <Form
          style={{
            width: '70%',
            margin: '0 auto',
            textAlign: 'center',
            marginBottom: 50,
          }}
          loading={this.state.loading}
        >
          <h2>Company Representatives</h2>
          <Grid columns="equal">
            <Grid.Column>
              <Form.Field loading={this.state.loading}>
                <Form.Input
                  placeholder="Name"
                  name="companyRepName1"
                  onChange={this.handleChange}
                />
              </Form.Field>
              <Form.Field>
                <Form.Input
                  type="email"
                  placeholder="email"
                  name="companyRepEmail1"
                  onChange={this.handleChange}
                />
              </Form.Field>
              <Form.Field>
                <Form.Input
                  placeholder="Phone number"
                  name="companyRepPhone1"
                  onChange={this.handleChange}
                />
              </Form.Field>
              <Form.Field>
                <label>
                  Upload Passport Photographs of the Company Representative(s)
                </label>
                <input
                  type="file"
                  name="companyRepPassportUrl1"
                  onChange={this.handleChange}
                  accept=".pdf, image/*"
                />
              </Form.Field>
              <Form.Field>
                <label>
                  Upload curriculum Vitae of Company Representative(s)
                </label>
                <input
                  type="file"
                  name="companyRepCVurl"
                  onChange={this.handleChange}
                  accept=".pdf, image/*"
                />
              </Form.Field>
            </Grid.Column>
            <Grid.Column>
              <Form.Field loading={this.state.loading}>
                <Form.Input
                  placeholder="Name"
                  name="companyRepName2"
                  onChange={this.handleChange}
                />
              </Form.Field>
              <Form.Field>
                <Form.Input
                  type="email"
                  placeholder="email"
                  name="companyRepEmail2"
                  onChange={this.handleChange}
                />
              </Form.Field>
              <Form.Field>
                <Form.Input
                  placeholder="Phone number"
                  name="companyRepPhone2"
                  onChange={this.handleChange}
                />
              </Form.Field>
              <Form.Field>
                <label>
                  Upload Passport Photographs of the Company Representative(s)
                </label>
                <input
                  type="file"
                  name="companyRepPassportUrl2"
                  onChange={this.handleChange}
                  accept=".pdf, image/*"
                />
              </Form.Field>
              <Form.Field>
                <label>
                  Upload curriculum Vitae of Company Representative(s)
                </label>
                <input
                  type="file"
                  name="companyCOIUrl"
                  onChange={this.handleChange}
                  accept=".pdf, image/*"
                />
              </Form.Field>
            </Grid.Column>
          </Grid>
          <Grid centered columns={2}>
            <Grid.Column>
              <Form.Field>
                <label style={{ textAlign: 'center' }}>
                  Upload CAC document
                </label>
                <input
                  type="file"
                  name="companyRepCVUrl2"
                  onChange={this.handleChange}
                  accept=".pdf, image/*"
                />
              </Form.Field>
            </Grid.Column>
          </Grid>
          <div style={{ marginTop: 30 }}>
            <Button to="/cont2" as={Link}>
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
          Copyright © 2018 Abuja Chamber of Commerce & Industry
        </footer>
      </React.Fragment>
    )
  }
}

export default withRouter(
  connect(({ user }) => ({ user }), { update })(ContReg3)
)
