import React, { Component } from "react";
import { Menu, Icon } from "semantic-ui-react";
import { Link, withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import Logo from "../../images/ACCIHD-LOGO.png";
import { getUserProfile } from "../../actions/users";
import "./Sidebar.css";

class SideBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.getUserProfile = this.getUserProfile.bind(this);
  }

  getUserProfile() {
    console.log('working')
  }

  render() {
    return (
      <Menu pointing secondary vertical fixed="top">
        <div style={{ padding: 10, background: "var(--main-gold)" }}>
          <img src={Logo} alt="" style={{ width: "100%", height: "100%" }} />
        </div>
        <Menu.Item
          to={`${this.props.match.path}`}
          as={Link}
        > Home
              <Icon name="home" />
        </Menu.Item>
        <Menu.Item
          onClick={this.getUserProfile}
          to={`${this.props.match.path}/profile`}
          as={Link}
        >Profile

              <Icon name="user" />
        </Menu.Item>
        <Menu.Item
          to={`${this.props.match.path}/events`}
          as={Link}
        >Events

              <Icon name="calendar" />
        </Menu.Item>
        <Menu.Item
          to={`${this.props.match.path}/payment`}
          as={Link}
        >Payment

              <Icon name="payment" />
        </Menu.Item>
        <Menu.Item
          to={`${this.props.match.path}/discuss`}
          as={Link}
        >Discussion

              <Icon name="comments" />
        </Menu.Item>
        <Menu.Item
          as={Link}
          to={`${this.props.match.path}/project`}
        >Projects

              <Icon name="hourglass end" />
        </Menu.Item>
        <Menu.Item
          as={Link}
          to={`${this.props.match.path}/library`}
        >Library

              <Icon name="book" />
        </Menu.Item>
      </Menu>
    )  
  }  
}
      
export default connect(null, { getUserProfile })(SideBar)