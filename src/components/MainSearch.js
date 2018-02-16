import _ from "lodash";
import api from "../api";
import React, { Component } from "react";
import { Search, Grid } from "semantic-ui-react";
import {connect} from 'react-redux'

class MainSearch extends Component {
  componentWillMount() {
    this.resetComponent();
  }

  resetComponent = () =>
    this.setState({ isLoading: false, results: [], value: "" });

  handleResultSelect = (e, { result }) =>
    this.setState({ value: result.title });

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value });

  };

  componentDidMount = () => {
    const { user: {token}} = this.props
    api.fetchUsers(token).then((res) => {
      const data = res.data
      this.setState({
        results: data.map((user) => ({
          title: user.companyName,
          description: user.companyName,
          image: user.profileImage,
          price: user.companyBusiness
        }))
      })
    })
  }
  

  render() {
    const { isLoading, value, results } = this.state;
    console.log("result", results)
    return (
      <Grid>
        <Grid.Column width={16}>
          <Search
            loading={isLoading}
            onResultSelect={this.handleResultSelect}
            onSearchChange={this.handleSearchChange}
            results={results}
            value={value}
            {...this.props}
            placeholder="search connections"
          />
        </Grid.Column>
      </Grid>
    );
  }
}

export default connect(({user}) => ({user}), null)(MainSearch)