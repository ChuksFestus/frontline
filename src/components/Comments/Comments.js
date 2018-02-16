import React, { Component } from "react";
import {
  Button,
  Segment,
  Dimmer,
  Loader,
  Divider,
  Image,
  Transition,
  Comment,
  Icon,
  Form,
  Label
} from "semantic-ui-react";
import { connect } from "react-redux";
import axios from "axios";
import setAuthorizationHeader from "../../actions/setAuthorizationHeader";

// const BASEURL = "http://membership-api.accinigeria.com/";
const BASEURL = 'http://acciapi.ml/'

class Comments extends Component {
  constructor() {
    super();
    this.state = { comments: [], visible: false, loading: false };
  }

  state_setComments = comments => {
    let state = this.state.comments;
    state.push(comments);
    this.setState({ comments: state });
    console.log(state, this.state.comments);
  };
  getComments = () => {
    const { user: { token, id }, post } = this.props;
    // console.log(this.props)
    // console.log(token, id)
    // setAuthorizationHeader(token)
    axios(`${BASEURL}api/v1/social/comment/${post}`, {
      headers: {
        authorization: token
      }
    }).then(response => {
      // console.log('response', response)
      this.state_setComments(response.data);
    });
  };
  replyComment = event => {
    const { user: { token, id }, post } = this.props;
    let parent = event.target.parentElement;
    let data = event.target.querySelector("textarea");
    this.setState({
      loading: !this.state.loading
    });
    axios
      .post(
        `${BASEURL}api/v1/social/comment`,
        { comment: data.value, owner: id, post: post },
        {
          headers: {
            authorization: token
          }
        }
      )
      .then(response => {
        this.state_setComments(response.data);
        this.setState({
          loading: !this.state.loading
        });
        data.value = "";
        parent.classList.add("hidden");
        parent.classList.remove("visible");
      });
  };

  componentDidMount() {
    this.setState({
      comments: this.props.comments
    });
  }

  toggleVisibility = () => this.setState({ visible: !this.state.visible });

  render() {
    const { visible, comments } = this.state;

    return (
      <React.Fragment>
        <Button
          size="mini"
          content={visible ? "Hide" : "Show"}
          onClick={this.toggleVisibility}
        >
          <Icon name="comment" />
          comment {comments.length}
        </Button>
        {/* <Button as='div' labelPosition='right'>
          
          <Button
            basic color='blue'
            content={visible ? 'Hide' : 'Show'} onClick={this.toggleVisibility}
            size="mini"
          >
            <Icon name='comment' />
            comment
          </Button>
          <Label as='a' basic color='blue' pointing='left'>{comments.length}</Label>
        </Button> */}
        <Divider hidden />
        <Transition visible={visible} animation="slide down" duration={500}>
          <Comment.Group>
            {comments.length
              ? comments
                  .map((com, i) => (
                    <React.Fragment>
                      <Comment>
                        <Comment.Content>
                          <Comment.Author as="a">
                            {com.companyName}
                          </Comment.Author>
                          <Comment.Text>{com.comment}</Comment.Text>
                        </Comment.Content>
                      </Comment>
                    </React.Fragment>
                  ))
                  .reverse()
              : false}
            <Form
              reply
              onSubmit={this.replyComment}
              loading={this.state.loading}
            >
              <Form.TextArea
                style={{ height: "auto !important" }}
                autoHeight
                rows={2}
                placeholder="leave a comment..."
              />
              <Button
                style={{ marginLeft: "75%" }}
                content="Add Comment"
                size="tiny"
                labelPosition="left"
                icon="edit"
                primary
              />
            </Form>
          </Comment.Group>
        </Transition>
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  user
});

export default connect(mapStateToProps, null)(Comments);
