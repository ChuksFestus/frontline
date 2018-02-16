import api from "../api";
import { USER_LOGGED_IN, USER_LOGGED_OUT, USER_REGISTERED } from "../types";
import setAuthorizationHeader from "./setAuthorizationHeader";

export const userLoggedIn = payload => ({
  type: USER_LOGGED_IN,
  payload
});

export const userLoggedOut = () => ({
  type: USER_LOGGED_OUT
});

export const userRegistered = payload => ({
  type: USER_REGISTERED,
  payload
});

export const oldMem = (data, history) => dispatch => {
  api.oldMem
    .check(data)
    .then(res => {
      console.log(res);

      localStorage.acciJWT = res.token;
      setAuthorizationHeader(res.token);
      console.log("res", res);
      dispatch(userLoggedIn(res));
      return Promise.resolve(res);
    })
    .then(res => {
      // dispatch(authorizeUser({ email: data.email, password: data.password }))
      console.log("success", res);
      history.push({ pathname: "/old", state: { id: res.id } });
    });
};
export const login2 = credentials => dispatch =>
  api.user.login(credentials).then(res => {
    console.log(res);

    localStorage.acciJWT = res.token;
    setAuthorizationHeader(res.token);
    console.log("res", res);
    // dispatch(userLoggedIn(res));
    return Promise.resolve(res);
  });

export const login = credentials => dispatch =>
  api.user.login(credentials).then(res => {
    console.log(res);

    localStorage.acciJWT = res.token;
    setAuthorizationHeader(res.token);
    console.log("res", res);
    dispatch(userLoggedIn(res));
    return Promise.resolve(res);
  });

export const authorizeUser = credentials => dispatch => {
  api.user.login(credentials).then(res => {
    // localStorage.acciJWT = res.token;
    setAuthorizationHeader(res.token);
    dispatch(userRegistered({ token: res.token, ...res.data.user }));
  });
};
export const logout = () => dispatch => {
  localStorage.removeItem("acciJWT");
  dispatch(userLoggedOut());
};

export const resetPasswordRequest = email => () => {
  api.user.resetPasswordRequest(email);
  // console.log("yoooo");
};
// api.user.resetPasswordRequest(email);
// console.log("yoooo");

export const resetPassword = data => () => api.user.resetPassword(data);

export const signup = (data, history) => dispatch => {
  api.signup.reg(data).then(res => {
    // dispatch(authorizeUser({ email: data.email, password: data.password }))
    console.log("success", res);
    history.push({
      pathname: "/login",
      state: {
        id: res.data.id
      }
    });
  });
};

export const signup2 = (data, history) => dispatch => {
  api.signup
    .reg(data)
    .then(res => console.log(res.data))
    .then(login2(data))
    .then(res => {
      // dispatch(authorizeUser({ email: data.email, password: data.password }))
      dispatch(userLoggedIn(res));
      console.log("success", res);
      history.push({
        pathname: "/cont",
        state: {
          id: res.id
        }
      });
    })
    .then(console.log("something again"));
};

// update on user
export const update = (userData, id) => dispatch =>
  api.signup.contreg(userData, id).then(({ data }) => {
    // dispatch(authorizeUser({ email: data.email, password: data.password }))
    console.log("reg update dispatch", data);
    dispatch(userLoggedIn(data));
    return Promise.resolve(data);
  });
