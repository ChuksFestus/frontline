import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import {
  Button,
  Card,
  Image,
  Icon,
  Dimmer,
  Loader,
  Segment,
  Label,
} from 'semantic-ui-react'
// import { getPostData } from '../../utils/membership-api'
import setAuthorizationHeader from '../../actions/setAuthorizationHeader'
// import user from '../../reducer/user'
import './Timeline.css'
import Comments from '../Comments/Comments'

const BASEURL = 'https://obscure-waters-44612.herokuapp.com/'
// const BASEURL = 'https://2968008f.ngrok.io/'

class Timelines extends React.Component {
  constructor() {
    super()
    this.state = { posts: [] }
  }
  state_setPosts = posts => {
    this.setState(state => ({ ...state, posts }))
  }
  getPosts() {
    const { user: { token, id } } = this.props
    // console.log(this.props)
    // console.log(token, id)
    // setAuthorizationHeader(token)
    axios(`${BASEURL}api/v1/social/post/`, {
      headers: {
        authorization: token,
      },
    }).then(response => {
      // console.log('response', response)
      this.state_setPosts(response.data)
    })
  }

  likePost = (postId, index) => {
    const { user: { token, id } } = this.props
    axios
      .post(
        `${BASEURL}api/v1/social/post/like`,
        {
          id: postId,
          liker: id,
        },
        {
          headers: {
            authorization: token,
            'Content-Type': 'application/form-data',
            Accept: 'application/form-data',
          },
        }
      )
      .then(() => {
        const updatedPosts = this.state.posts.map((post, i) => {
          post.likes = !post.likes ? [] : post.likes
          return i === index ? (post.likes.push({}), post) : post
        })
        this.setState(prevState => ({
          ...prevState,
          post: updatedPosts,
        }))
      })
  }

  componentDidMount() {
    this.getPosts()
    // console.log(this.posts)
  }

  render() {
    const { posts } = this.state
    return (
      <React.Fragment>
        <Card.Group className="TimeLine">
          {posts.length ? (
            posts.map((post, i) => (
              <Card style={{ width: '100%' }} key={post.id}>
                <Card.Content>
                  <Image floated="left" size="mini" circular src="" />
                  <Card.Header>Chuks Festus</Card.Header>
                  <Card.Meta>
                    on {new Date(post.createdAt).toDateString()}
                  </Card.Meta>
                  <Card.Description>{post.postText}</Card.Description>
                  <Card.Description>
                    <img
                      src={post.postImage}
                      alt=""
                      style={{ width: '100%', marginTop: 10 }}
                    />
                  </Card.Description>
                </Card.Content>
                <Card.Content extra className="time">
                  <Button as="div" labelPosition="right">
                    <Button
                      basic
                      color="red"
                      onClick={() => {
                        this.likePost(post.id, i)
                      }}
                      size="mini"
                    >
                      <Icon name="heart" />
                      Like
                    </Button>
                    <Label as="a" basic color="red" pointing="left">
                      {post.likes ? post.likes.length : 0}
                    </Label>
                  </Button>

                  <Comments />
                  {/* <Button icon="comment" size="mini" /> */}
                  {/* <Button icon="share" size="mini" /> */}
                </Card.Content>
              </Card>
            ))
          ) : (
            <Segment>
              <Dimmer active inverted>
                <Loader inverted>Loading</Loader>
              </Dimmer>
            </Segment>
          )}
        </Card.Group>
      </React.Fragment>
    )
  }
}

const mapStateToProps = ({ user }) => ({
  user,
})

export default connect(mapStateToProps, null)(Timelines)
