import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import { Button, Icon } from "semantic-ui-react";
import { getProjects } from "../actions/projects";

const BASEURL = "http://acciapi.ml/";

class MainProd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      topicInfo: ""
    };
  }

  componentDidMount() {
    this.props.getProjects(this.props.match.params.name).then(data => {
      console.log("data", this.props.topicDetails);
      this.setState({
        topicInfo: this.props.topicDetails.projects
      });
    });
  }

  likePost = (postId, index) => {
    const { user: { token, id } } = this.props;
    axios
      .post(
        `${BASEURL}api/v1/getprojects`,
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

  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  render() {
    const { topicInfo } = this.state;

    return (
      <div
        style={{
          // width: '50%',
          // border: '1px solid #aaa',
          backgroundColor: "#fff",
          boxShadow: "2px 2px 15px rgba(0,0,0,0.1)",
          padding: "2rem"
        }}
      >
        <div
          style={{
            display: "flex"
          }}
        >
          <div
            style={{
              position: "relative",
              width: "60%"
            }}
          >
            <div
              style={{
                position: "absolute",
                width: "100%"
              }}
            >
              <h3
                style={{
                  padding: "0.5rem 1rem",
                  backgroundColor: "rgba(0,0,0,0.74)",
                  color: "#fff"
                }}
              >
                {topicInfo.title}
              </h3>
            </div>
            <figure
              style={{
                margin: "0px"
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: "210px",
                  overflow: "hidden"
                }}
              >
                <img
                  style={{
                    height: "auto",
                    width: "100%"
                  }}
                  src={topicInfo.banner}
                  alt=""
                />
              </div>
              <figcaption
                style={{
                  padding: "1rem"
                }}
              >
                <p>{topicInfo.description}</p>
                <Button size="mini">
                  <Icon color="red" name="like" /> likes 0
                </Button>
                <Button icon="comment" size="mini">
                  Comments 0
                </Button>
              </figcaption>
            </figure>
          </div>

          <div
            style={{
              paddingLeft: "2rem",
              width: "40%"
            }}
          >
            <div>
              <h4
                style={{
                  backgroundColor: "#e6e6e6",
                  color: "#444",
                  // marginBottom: '1rem',
                  padding: "0.45rem 1rem"
                }}
              >
                Details
              </h4>
            </div>
            <div
              style={{
                backgroundColor: "#f8f8f8",
                // boxShadow: '1px 1px 8px rgba(0,0,0,0.1)',
                padding: "0.75rem 1rem 0.25rem"
              }}
            >
              <div
                style={{
                  borderBottom: "1px solid #e6e6e6",
                  marginBottom: "0.75rem",
                  paddingBottom: "0.75rem"
                }}
              >
                <h5
                  style={{
                    fontWeight: 900,
                    margin: "0px",
                    marginBottom: "0.5rem"
                  }}
                >
                  Start:
                </h5>
                <p
                  style={{
                    color: "#656565"
                  }}
                >
                  {" "}
                  on {new Date(topicInfo.createdAt).toDateString()}
                </p>
              </div>
              <div
                style={{
                  borderBottom: "1px solid #e6e6e6",
                  marginBottom: "0.75rem",
                  paddingBottom: "0.75rem"
                }}
              >
                <h5
                  style={{
                    fontWeight: 900,
                    margin: "0px",
                    marginBottom: "0.5rem"
                  }}
                >
                  End:
                </h5>
                <p
                  style={{
                    color: "#656565"
                  }}
                >
                  {" "}
                  on {new Date(topicInfo.updatedAt).toDateString()}
                </p>
              </div>
              <div
                style={{
                  borderBottom: "1px solid #e6e6e6",
                  marginBottom: "0.75rem",
                  paddingBottom: "0.75rem"
                }}
              >
                <h5
                  style={{
                    fontWeight: 900,
                    margin: "0px",
                    marginBottom: "0.5rem"
                  }}
                >
                  Venue:
                </h5>
                <p
                  style={{
                    color: "#656565"
                  }}
                >
                  {" "}
                  Abuja International Trade & Convention Center, Km 8, Umar
                  Yar'Adua Express Way, (Airport Road), Abuja
                </p>
              </div>
              <div
                style={{
                  borderBottom: "1px solid #e6e6e6",
                  marginBottom: "0.75rem",
                  paddingBottom: "0.75rem"
                }}
              >
                <h5
                  style={{
                    fontWeight: 900,
                    margin: "0px",
                    marginBottom: "0.5rem"
                  }}
                >
                  Organizer:
                </h5>
                <p
                  style={{
                    color: "#656565"
                  }}
                >
                  {" "}
                  Abuja Chamber of commerce and Industry
                </p>
              </div>
              <div
                style={{
                  borderBottom: "1px solid #e6e6e6",
                  marginBottom: "0.75rem",
                  paddingBottom: "0.75rem"
                }}
              >
                <h5
                  style={{
                    fontWeight: 900,
                    margin: "0px",
                    marginBottom: "0.5rem"
                  }}
                >
                  Cost:
                </h5>
                <p> N50,000</p>
              </div>
              {/* <div>
                <a
                  style={{
                    backgroundColor: "#9c1b4f",
                    borderRadius: "5px",
                    color: "#fff",
                    display: "block",
                    marginBottom: "0.5rem",
                    padding: "0.5rem 1rem",
                    textAlign: "center"
                  }}
                >
                  Register
                </a>
                <a
                  style={{
                    backgroundColor: "#d5c67a",
                    borderRadius: "5px",
                    color: "#fff",
                    display: "block",
                    marginBottom: "0.5rem",
                    padding: "0.5rem 1rem",
                    textAlign: "center"
                  }}
                >
                  Book on hold
                </a>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  topicDetails: state.projects
});

export default connect(mapStateToProps, {
  getProjects
})(MainProd);

// export default MainProd
