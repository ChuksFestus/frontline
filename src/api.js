import axios from "axios";

// const BASEURL = "http://localhost:1337/";
// const BASEURL = "http://membership-api.accinigeria.com/";
const BASEURL = 'http://acciapi.ml/'

export default {
  user: {
    login: credentails =>
      axios
        .post(`${BASEURL}api/v1/auth/user`, credentails)
        .then(res => {
          const { data: { user: { id }, token } } = res;
          return Promise.all([
            res.data,
            axios(`${BASEURL}api/v1/user/${id}`, {
              headers: {
                authorization: token
              }
            })
          ]);
        })
        .then(responses => {
          return Promise.resolve({ ...responses[0], ...responses[1].data });
        }),
    getUserData: ({ id, token }) =>
      axios(`${BASEURL}api/v1/user/${id}`, {
        headers: {
          authorization: token
        }
      }),

    signup: user =>
      axios
        .post(`${BASEURL}api/v1/user`, user, {
          headers: {
            "Content-Type": "application/form-data",
            Accept: "application/form-data"
          }
        })
        .then(res => res.data.user),

    resetPasswordRequest: email =>
      axios.post(`${BASEURL}api/v1/user/reset`, email, {
        headers: {
          "Content-Type": "application/form-data",
          Accept: "application/form-data"
        }
      }),

    profile: id =>
      axios.get(`${BASEURL}api/v1/user/${id}`).then(res => res.data),
    activity: id =>
      axios.get(`${BASEURL}api/v1/useractivity/${id}`).then(res => res.data),
    friends: id =>
      axios.get(`${BASEURL}api/v1/userfriends/${id}`).then(res => res.data),
    updateUser: (id, credentails) =>
      axios
        .put(`${BASEURL}api/v1/user/${id}`, credentails)
        .then(res => res.data)
  },
  // posts: {
  //   fetchAll: () => axios.get(`${BASEURL}api/v1/social/post/`).then(res => res.data.post),
  //   create: book =>
  //     axios.post(`${BASEURL}api/v1/social/post/`, { post }).then(res => res.data.post)
  // }
  oldMem: {
    check: data =>
      axios
        .post(`${BASEURL}api/v1/auth/oldmember`, data, {
          headers: {
            "Content-Type": "application/form-data",
            Accept: "application/form-data",
            authorization: data.token
          }
        })
        .then(res => {
          const { data: { user: { id }, token } } = res;
          return Promise.all([
            res.data,
            axios(`${BASEURL}api/v1/user/${id}`, {
              headers: {
                authorization: token
              }
            })
          ]);
        })
        .then(responses => {
          return Promise.resolve({ ...responses[0], ...responses[1].data });
        }),
    contLogin: (data, id) =>
      axios.put(`${BASEURL}api/v1/user/${id}`, data, {
        headers: {
          "Content-Type": "application/form-data",
          Accept: "application/form-data",
          authorization: data.token
        }
      })
  },
  signup: {
    reg: data =>
      axios.post(`${BASEURL}api/v1/user`, data, {
        headers: {
          "Content-Type": "application/form-data",
          Accept: "application/form-data"
        }
      }),
    contreg: (data, id) => {
      console.log(data, id);
      return axios
        .put(`${BASEURL}api/v1/user/${id}`, data, {
          headers: {
            "Content-Type": "application/form-data",
            Accept: "application/form-data",
            authorization: data.token
          }
        })
        .then(() =>
          axios(`${BASEURL}api/v1/user/${id}`, {
            headers: {
              authorization: data.token
            }
          })
        );
    },
    alertReferee: data =>
      axios.post(`${BASEURL}api/v1/alertreferee`, data, {
        headers: {
          "Content-Type": "application/form-data",
          Accept: "application/form-data",
          authorization: data.token
        }
      }),
    validateReferee: (data, token) =>
      axios.post(`${BASEURL}api/v1/validatereferee`, data, {
        headers: {
          "Content-Type": "application/form-data",
          Accept: "application/form-data",
          authorization: token
        }
      })

    // contreg2: data => {

    // },

    // contreg3: data => {

    // },

    // contreg4: data => {

    // },

    // contreg5: data => {

    // },

    // contreg6: data => {

    // },
  },

  timeline: {
    feeds: id => axios.get(`${BASEURL}api/v1/social/feed/${id}`),
    makepost: (data, token) =>
      axios.post(`${BASEURL}api/v1/social/post`, data, {
        headers: {
          "Content-Type": "application/form-data",
          Accept: "application/form-data",
          authorization: token
        }
      }),
    likepost: data => axios.post(`${BASEURL}api/v1/social/post/like`, data)
  },
  payments: {
    donations: id =>
      axios
        .get(`${BASEURL}api/v1/userpayments/donations/${id}`)
        .then(res => res.data),
    events: id =>
      axios
        .get(`${BASEURL}api/v1/userpayments/events/${id}`)
        .then(res => res.data),
    trainings: id =>
      axios
        .get(`${BASEURL}api/v1/userpayments/trainings/${id}`)
        .then(res => res.data),
    memberships: id =>
      axios
        .get(`${BASEURL}api/v1/userpayments/memberships/${id}`)
        .then(res => res.data)
  },
  forum: {
    reg: data =>
      axios.post(`${BASEURL}api/v1/forum/post`, data, {
        headers: {
          "Content-Type": "application/form-data",
          Accept: "application/form-data"
        }
      }),
    getForums: () =>
      axios.get(`${BASEURL}api/v1/forum/post/`).then(res => res.data),
    getOne: id =>
      axios.get(`${BASEURL}api/v1/forum/post/${id}`).then(res => res.data)
  },
  projects: {
    reg: data =>
      axios.get(`${BASEURL}api/v1/getprojects`, data, {
        headers: {
          "Content-Type": "application/form-data",
          Accept: "application/form-data"
        }
      }),

    ongoing: token => {
      return axios.get(`${BASEURL}api/v1/projects/ongoing`, {
        headers: {
          "Content-Type": "application/form-data",
          Accept: "application/form-data",
          authorization: token
        }
      });
    },
    completed: token => {
      return axios.get(`${BASEURL}api/v1/projects/completed`, {
        headers: {
          "Content-Type": "application/form-data",
          Accept: "application/form-data",
          authorization: token
        }
      });
    },
    getOne: id =>
      axios.get(`${BASEURL}api/v1/getprojects/${id}`).then(res => res.data)
  },
  events: {
    reg: data =>
      axios.get(`${BASEURL}api/v1/getevents`, data, {
        headers: {
          "Content-Type": "application/form-data",
          Accept: "application/form-data"
        }
      }),

    ongoing: token => {
      return axios.get(`${BASEURL}api/v1/events/ongoing`, {
        headers: {
          "Content-Type": "application/form-data",
          Accept: "application/form-data",
          authorization: token
        }
      });
    },
    completed: token => {
      return axios.get(`${BASEURL}api/v1/events/completed`, {
        headers: {
          "Content-Type": "application/form-data",
          Accept: "application/form-data",
          authorization: token
        }
      });
    },
    getOne: id =>
      axios.get(`${BASEURL}api/v1/getevents/${id}`).then(res => res.data)
  },

  fetchDocs: cat => {
    // console.log(this.res);
    axios
      .get(`${BASEURL}api/v1/knowledgebase/category`, {
        headers: {
          "Content-Type": "application/form-data",
          Accept: "application/form-data"
          // authorization: token
        }
      })
      .then(res => res.data.names.map(name => res.data.names));
  },

  fetchUsers: token => {
    return axios
      .get(`${BASEURL}api/v1/user/`, {
        headers: {
          "Content-Type": "application/form-data",
          Accept: "application/form-data",
          authorization: token
        }
      })
  }
};
