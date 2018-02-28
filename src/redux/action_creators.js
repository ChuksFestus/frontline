import * as actions from './actions'

export const changeMainSection = ({ index: payload }) => ({
  type: actions.CHANGE_MAIN_SECTION,
  payload,
})

// AUTH

export const receivedLoginAuthDetails = obj => ({
  type: actions.RECEIVED_LOGIN_AUTH_DETAILS,
  payload: obj,
})

export const logOut = () => ({
  type: actions.LOG_OUT,
  payload: undefined,
})

// USERS

export const receivedUserDetails = obj => ({
  type: actions.RECEIVED_USER_DETAILS,
  payload: obj,
})

export const receivedUsers = users => ({
  type: actions.RECEIVED_USERS,
  payload: users,
})

export const receivedUserActivity = activity => ({
  type: actions.RECEIVED_USER_ACTIVITY,
  payload: activity,
})

export const receivedFriendRequests = requests => ({
  type: actions.RECEIVED_FRIEND_REQUESTS,
  payload: requests,
})

export const sentFriendRequest = successResponse => ({
  type: actions.SENT_FRIEND_REQUEST,
  payload: successResponse,
})

export const acceptedFriendRequest = params => ({
  type: actions.ACCEPTED_FRIEND_REQUEST,
  payload: params,
})

export const canceledFriendRequest = params => ({
  type: actions.CANCELED_FRIEND_REQUEST,
  payload: params,
})

// SOCIAL

export const receivedTimelinePosts = posts => ({
  type: actions.RECIEVED_TIMELINE_POSTS,
  payload: posts,
})

export const likedPost = successResponse => ({
  type: actions.LIKED_POST,
  payload: successResponse,
})

export const createdComment = obj => ({
  type: actions.CREATED_COMMENT,
  payload: obj,
})

// Event

export const receivedOngoingEvents = onGoingEvents => ({
  type: actions.RECEIVED_ONGOING_EVENTS,
  payload: onGoingEvents,
})

export const receivedCompletedEvents = onCompletedEvents => ({
  type: actions.RECEIVED_COMPLETED_EVENTS,
  payload: onCompletedEvents,
})

export const likedEvent = event => ({
  type: actions.LIKED_EVENT,
  payload: event,
})

// Payment

export const receiveMembershipPayment = payment => ({
  type: actions.RECEIVED_MEMBERSHIP_PAYMENT,
  payload: payment,
})