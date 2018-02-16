import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import {
  Button,
  Card,
  Image,
  Icon,
  Dimmer,
  Loader,
  Segment
} from "semantic-ui-react";
// import { getPostData } from '../../utils/membership-api'
// import setAuthorizationHeader from '../../actions/setAuthorizationHeader'
// import user from '../../reducer/user'
import "./Timeline.css";
import Comments from "../Comments/Comments";
import avatar from "../../images/image (4).png";

const BASEURL = "http://acciapi.ml/";
// const BASEURL = 'https://2968008f.ngrok.io/'

class Timelines extends React.Component {
  constructor() {
    super();
    this.state = { posts: [] };
  }
  state_setPosts = posts => {
    this.setState(state => ({ ...state, posts }));
  };
  getPosts() {
    const { user: { token, id } } = this.props;
    // console.log(this.props)
    // console.log(token, id)
    // setAuthorizationHeader(token)
    axios(`${BASEURL}api/v1/social/post/`, {
      headers: {
        authorization: token
      }
    }).then(response => {
      this.state_setPosts(response.data);
    });
  }

  likePost = (postId, index) => {
    const { user: { token, id } } = this.props;
    axios
      .post(
        `${BASEURL}api/v1/social/post/like`,
        {
          id: postId,
          liker: id
        },
        {
          headers: {
            authorization: token,
            "Content-Type": "application/form-data",
            Accept: "application/form-data"
          }
        }
      )
      .then(() => {
        const updatedPosts = this.state.posts.map((post, i) => {
          post.likes = !post.likes ? [] : post.likes;
          return i === index ? (post.likes.push({}), post) : post;
        });
        this.setState(prevState => ({
          ...prevState,
          post: updatedPosts
        }));
      });
  };

  componentDidMount() {
    this.getPosts();
    // console.log(this.posts)
  }

  render() {
    const { posts } = this.state;
    return (
      <React.Fragment>
        <Card.Group className="TimeLine">
          {posts.length ? (
            posts.map(
              (post, i) => (
                console.log(post),
                (
                  <Card style={{ width: "100%" }} key={post.id}>
                    <Card.Content>
                      <Image floated="left" size="mini" circular src={avatar} />
                      <Card.Header style={{ marginTop: 5 }}>
                        {post.companyName}
                      </Card.Header>
                      <Card.Meta style={{ fontSize: 10 }}>
                        on {new Date(post.createdAt).toDateString()}
                      </Card.Meta>
                      <Card.Description>{post.postText}</Card.Description>
                      <Card.Description>
                        <img
                          src={post.postImage}
                          alt=""
                          style={{ width: "100%", marginTop: 10 }}
                        />
                      </Card.Description>
                    </Card.Content>
                    <Card.Content extra className="time">
                      <Button
                        size="mini"
                        style={{ marginLeft: "70%", marginTop: 10 }}
                        onClick={() => {
                          this.likePost(post.id, i);
                        }}
                      >
                        <Icon color="red" name="like" />
                        Likes {post.likes ? post.likes.length : 0}
                      </Button>

                      {/* <Button icon="comment" size="mini" /> */}
                      {/* <Button icon="share" size="mini" /> */}
                      <Comments post={post.id} comments={post.comments} />
                    </Card.Content>
                  </Card>
                )
              )
            )
          ) : (
            <Segment>
              <Dimmer active inverted>
                <Loader inverted>Loading</Loader>
              </Dimmer>
            </Segment>
          )}
        </Card.Group>
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  user
});

export default connect(mapStateToProps, null)(Timelines);
