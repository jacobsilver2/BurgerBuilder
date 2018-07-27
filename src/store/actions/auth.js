// ALL ACTIONS GET EXPORTED FROM ONE FILE, ./index.js

import * as actionTypes from './actionTypes'
import axios from 'axios';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: token,
    userId: userId
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  }
}

export const logout = () => {
  // clear the local storage token
  localStorage.removeItem('token');
  localStorage.removeItem('expirationDate');
  localStorage.removeItem('userId');
  return {
    type:  actionTypes.AUTH_LOGOUT 
  };
}

export const checkAuthTimeout = (expirationTime) => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000)
  }; //expiration time is 3600, must multiply it by 1000 to turn it into an hour
}

export const auth = (email, password, isSignUp) => {
  return dispatch => {
    dispatch(authStart());
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true,
    }
    let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyAGQNRGZTNmyJcO0VvFgYzTIOLMptqH0oo'
    if (!isSignUp) {
      url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyAGQNRGZTNmyJcO0VvFgYzTIOLMptqH0oo'
    }
    axios.post(url, authData)
      .then(resp => {
        const expirationDate = new Date(new Date().getTime() + resp.data.expiresIn * 1000); // time of now + amount of expiry time (converted to seconds from milliseconds)
        localStorage.setItem('token', resp.data.idToken); //set the token to loacl storage
        localStorage.setItem('expirationDate', expirationDate); //set another local storage to the expiraton date
        localStorage.setItem('userId', resp.data.localId)
        dispatch(authSuccess(resp.data.idToken, resp.data.localId));
        dispatch(checkAuthTimeout(resp.data.expiresIn))
      })
      .catch(err => {
        console.log(err)
        dispatch(authFail(err.response.data.error))
      });
  }
} 

export const setAuthRedirectPath = (path) => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path: path
  }
}

export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem('token');
    if (!token) {
      dispatch(logout())
    } else {
      const expirationDate = new Date(localStorage.getItem('expirationDate'));
      if (expirationDate <= new Date()) { // check if the expiration date is after right now
        dispatch(logout())
      } else {
        const userId = localStorage.getItem('userId')
        dispatch(authSuccess(token, userId))
        dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime() ) / 1000) //the future date in seconds - the current date in seconds
      ) 
      }
    }
  };
}