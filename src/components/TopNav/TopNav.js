import React, { Component } from "react";
import { Input, Menu, Icon, Label, Dropdown, Search } from "semantic-ui-react";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { Link } from 'react-router-dom'
import axios from 'axios'
import { logout } from "../../actions/auth";

import "./TopNav.css";

const BASEURL = 'https://obscure-waters-44612.herokuapp.com/'
// const BASEURL = 'https://2968008f.ngrok.io'

class TopNav extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      notifications : [],
      friends       : [],
      isLoading     : false,
      value         : null,
      results       : []
    }
  }
  render() {
    const { isLoading, value, results } = this.state
    const notification = this.state.notifications
    let notifs
    let friends
    let searchOutput
    if(notification.length > 0){
      notifs = notification.map((notif) =>(
                <Dropdown.Item key={notif} as={Link} to={BASEURL+"api/v1/notifications/"+notif.userId}><strong>{notif.from}</strong> says {notif.message}</Dropdown.Item>
              ))
    }
    else {
      notifs = <Dropdown.Item>There is no notification</Dropdown.Item>
    }
    if(value.length > 1) {
      if(0){

      }
      else {
        searchOutput = 1
      }
    }

    const requests = this.state.friends
    if(requests.length > 0){
      friends = requests.map((friend) =>(
                  <Dropdown.Item key={friend}>{friend.requester} sent a friend request</Dropdown.Item>
                ))
    }
    else {
      friends = <Dropdown.Item>You do not have any friend requests</Dropdown.Item>
    }
    return (
      <Menu fixed="top" secondary className="top-menu">
        <Menu.Item>
          <Input
            icon="search"
            placeholder="find a member or project..."
            className="search-box"
            onSearchChange={this.handleSearchChange}
          />
        </Menu.Item>
        <Menu.Menu position="right">
          <Menu.Item
            name="friends"
          >
            <Icon name="users" />
            <Label color="red" floating circular size="mini" >
              {this.state.friends.length}
                </Label>
              <Dropdown text='' floating>
                <Dropdown.Menu>
                  {friends}
                </Dropdown.Menu>
              </Dropdown>
          </Menu.Item>
          <Menu.Item
            name="notifications"
          >
            <Icon name="bell" />
            <Label color="red" floating circular size="mini">
              {this.state.notifications.length}
                </Label>
                <Dropdown text='' floating>
                <Dropdown.Menu>
                  {notifs}
                </Dropdown.Menu>
              </Dropdown>
          </Menu.Item>
          <Menu.Item onClick={() => this.props.logout()}>
            <Icon name='external' />
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    )
  }
  componentDidMount() {
    this.fetchNotifications()
    this.fetchFriends()
  }
  fetchNotifications = () => {
    let url = `${BASEURL}api/v1/notifications`
    this.fetchApi(url)
      .then(function(arr){
        this.setState({
          notifications : arr.data
        })
      }.bind(this))
  }
  fetchFriends = () => {
    let url = `${BASEURL}api/v1/social/requests/${this.props.user.id}`
    this.fetchApi(url)
      .then(function(arr){
        this.setState({
          friends : arr.data
        })
      }.bind(this))
  }
  fetchApi = url => {
    return axios.get(url, {
              headers: {
                'Content-Type': 'application/form-data',
                Accept: 'application/form-data',
              },
            })
  }
  componentWillMount() {
    this.resetComponent()
  }

  resetComponent = () => this.setState({ isLoading: false, results: [], value: '' })

  handleResultSelect = (e, { result }) => this.setState({ value: result.title })

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value })
    setTimeout(() => {
      if (this.state.value.length < 1) return this.resetComponent()
      const { user: { token, id }} = this.props

      axios(`${BASEURL}api/v1/searchuser`, {'searchTerm' : value}, {
        headers: {
          authorization: token,
        },
      }).then(response => {
        console.log('response', response)
        this.setState({
          isLoading: false,
          result : response.data
        })
      })
    }, 500)
  }
}

TopNav.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string.isRequired
  }).isRequired,
  logout: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps, { logout })(TopNav)