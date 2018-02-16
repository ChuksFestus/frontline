import React from "react";
import axios from "axios";
// import api from "../api";
import { Grid, Card, Icon, Input, List, Button } from "semantic-ui-react";
import { connect } from "react-redux";

const BASEURL = "http://acciapi.ml/";

const centerText = {
  textAlign: "center"
};

class Library extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category: [],
      file: null
    };
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.fileUpload = this.fileUpload.bind(this);
  }

  componentDidMount() {
    this.fetchDocs();
    // console.log("data", this.fetchDocs.res);
  }

  onFormSubmit(e) {
    e.preventDefault(); // Stop form submit
    this.fileUpload(this.state.file).then(response => {
      console.log(response.data);
    });
  }
  onChange(e) {
    this.setState({ file: e.target.files[0] });
  }

  fetchDocs() {
    axios
      .get(`${BASEURL}api/v1/knowledgebase/category`, {
        headers: {
          "Content-Type": "application/form-data",
          Accept: "application/form-data"
          // authorization: token
        }
      })
      .then(res => {
        this.setState({ category: res.data });
        console.log("name", res.data[0].name);
      });
  }

  fileUpload(file) {
    const { user: { token } } = this.props;
    const url = `${BASEURL}api/v1/knowledgebase/category`;
    const formData = new FormData();
    formData.append("file", file);
    const config = {
      headers: {
        "content-type": "multipart/form-data"
      }
    };
    return axios
      .post(
        `https://obscure-waters-44612.herokuapp.com/api/v1/user/upload`,
        formData,
        {
          headers: {
            "Content-Type": "application/form-data",
            Accept: "application/form-data",
            authorization: token
          }
        }
      )
      .then(({ data: { bannerUrl } }) =>
        axios.post(
          url,
          {
            document: bannerUrl
          },
          config
        )
      );
  }

  render() {
    return (
      <React.Fragment>
        <Grid>
          <div className="bana library">LIBRARY</div>
          <div className="sub-bana">(120) Library Items</div>
          <Grid.Row>
            <Grid.Column width={5}>
              <List
                divided
                relaxed
                style={{ background: "var(--white)", padding: 15 }}
              >
                <List.Item>
                  <List.Content>
                    <List.Header as="h4">Categories</List.Header>
                  </List.Content>
                </List.Item>
                {this.state.category.map(doc => (
                  <List.Item key={doc.id} id={doc.id}>
                    <List.Icon
                      name="folder"
                      size="large"
                      verticalAlign="middle"
                    />

                    <List.Content>
                      <List.Header style={{ color: "rgba(10, 1, 1, 0.674)" }}>
                        {doc.name}
                      </List.Header>
                    </List.Content>
                  </List.Item>
                ))}
              </List>
            </Grid.Column>
            <Grid.Column width={11}>
              <Card style={{ width: "100%" }}>
                <Card.Content header="General" style={centerText} />
                <Card.Content>
                  <Grid>
                    <Grid.Row style={{ margin: "0 auto" }}>
                      <Grid.Column width="5" style={centerText}>
                        <Icon name="file" size="huge" />
                        <p style={{ marginTop: 10 }}>
                          The Interesting Narrative of the Life of Olaudah
                          Equiano
                        </p>
                      </Grid.Column>
                      <Grid.Column width="5" style={centerText}>
                        <Icon name="file" size="huge" />
                        <p style={{ marginTop: 10 }}>
                          The Interesting Narrative of the Life of Olaudah
                          Equiano
                        </p>
                      </Grid.Column>
                      <Grid.Column width="5" style={centerText}>
                        <Icon name="file" size="huge" />
                        <p style={{ marginTop: 10 }}>
                          The Interesting Narrative of the Life of Olaudah
                          Equiano
                        </p>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </Card.Content>
              </Card>
            </Grid.Column>
            <Grid.Column width={10}>
              <List
                divided
                relaxed
                style={{ background: "var(--white)", padding: 15 }}
              >
                <h5>Upload File</h5>
                <form onSubmit={this.onFormSubmit}>
                  <Card.Content extra>
                    <Input
                      onChange={this.onChange}
                      style={{ width: "100%" }}
                      type="file"
                      placeholder="upload file"
                    />
                    <br />
                    <br />
                    <Button type="submit" basic color="green" size="tiny">
                      <Icon name="add circle" />Uploads Docs
                    </Button>
                  </Card.Content>
                </form>
              </List>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </React.Fragment>
    );
  }
}

export default connect(({ user }) => ({ user }))(Library);
