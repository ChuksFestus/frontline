import axios from 'axios'

// const BASEURL = "http://localhost:1337/";
const BASEURL = 'https://2968008f.ngrok.io/'

export default {
  user: {
    login: credentails =>
      axios
        .post(`${BASEURL}api/v1/auth/user`, credentails)
        .then(res => {
          const { data: { user: { id }, token } } = res
          return Promise.all([
            res.data,
            axios(`${BASEURL}api/v1/user/${id}`, {
              headers: {
                authorization: token,
              },
            }),
          ])
        })
        .then(responses => {
          return Promise.resolve({ ...responses[0], ...responses[1].data })
        }),

    signup: user =>
      axios
        .post(`${BASEURL}api/v1/user`, user, {
          headers: {
            'Content-Type': 'application/form-data',
            Accept: 'application/form-data',
          },
        })
        .then(res => res.data.user),

    resetPasswordRequest: email =>
      axios.post(`${BASEURL}api/vi/user/reset`, email),

    profile: id =>
      axios.get(`${BASEURL}api/v1/user/${id}`).then(res => res.data),
  },
  // posts: {
  //   fetchAll: () => axios.get(`${BASEURL}api/v1/social/post/`).then(res => res.data.post),
  //   create: book =>
  //     axios.post(`${BASEURL}api/v1/social/post/`, { post }).then(res => res.data.post)
  // }
  signup: {
    reg: data =>
      axios.post(`${BASEURL}api/v1/user`, data, {
        headers: {
          'Content-Type': 'application/form-data',
          Accept: 'application/form-data',
        },
      }),
    contreg: (data, id) =>
      axios.put(`${BASEURL}api/v1/user/${id}`, data, {
        headers: {
          'Content-Type': 'application/form-data',
          Accept: 'application/form-data',
          authorization: data.token,
        },
      }),

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
          'Content-Type': 'application/form-data',
          Accept: 'application/form-data',
          authorization: token,
        },
      }),
    likepost: data => axios.post(`${BASEURL}api/v1/social/post/like`, data),
  },

  projects: {
    ongoing: token => {
      return axios.get(`${BASEURL}api/v1/projects/ongoing`, {
        headers: {
          'Content-Type': 'application/form-data',
          Accept: 'application/form-data',
          authorization: token,
        },
      })
    },
    completed: token => {
      return axios.get(`${BASEURL}api/v1/projects/completed`, {
        headers: {
          'Content-Type': 'application/form-data',
          Accept: 'application/form-data',
          authorization: token,
        },
      })
    },
  },
  events: {
    ongoing: token => {
      return axios.get(`${BASEURL}api/v1/events/ongoing`, {
        headers: {
          'Content-Type': 'application/form-data',
          Accept: 'application/form-data',
          authorization: token,
        },
      })
    },
    completed: token => {
      return axios.get(`${BASEURL}api/v1/events/completed`, {
        headers: {
          'Content-Type': 'application/form-data',
          Accept: 'application/form-data',
          authorization: token,
        },
      })
    },
  },
}
