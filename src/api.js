import axios from 'axios'

// const BASEURL = "http://localhost:1337/";
const BASEURL = "https://obscure-waters-44612.herokuapp.com/";

export default {
  user: {
    login: credentails =>
      axios
        .post(`${BASEURL}api/v1/auth/user`, credentails)
        .then(res => res.data),

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
          "Content-Type": "application/form-data",
          Accept: "application/form-data"
        }
      }),
    contreg: (data, id) =>
      axios.put(`${BASEURL}api/v1/user/${id}`, data, {headers: {
      'Content-Type': 'application/form-data',
      Accept: 'application/form-data',
    }}),

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
    feeds: id=> axios.get(`${BASEURL}api/v1/social/feed/${id}`),
    makepost: data => axios.post(`${BASEURL}api/v1/social/post`, data),
    likepost: data => axios.post(`${BASEURL}api/v1/social/post/like`, data)
  }

}
