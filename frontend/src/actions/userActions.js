import axios from 'axios';

import { MY_ORDER_LIST_RESET } from '../constants/orderConstants';

import { 
    USER_LOGIN_REQUEST, 
    USER_LOGIN_SUCCESS, 
    USER_LOGIN_FAIL, 
    USER_LOGOUT,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    USER_DETAILS_RESET,
    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_SUCCESS,
    USER_UPDATE_PROFILE_FAIL,
} from '../constants/userConstants';


const BACKEND_URL = 'http://localhost:5000/';

export const login = (email, password) => async (dispatch) => {
  
  try {
    dispatch({
      type: USER_LOGIN_REQUEST
    })

    //Config object for request headers
    const config = {
      headers: {
        'Content-Type' : 'application/json'
      }
    }

    const { data } = await axios.post(`${BACKEND_URL}api/users/login`, { email, password }, config);

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data
    })

    localStorage.setItem('userInfo', JSON.stringify(data))

  } catch (err) {
    dispatch({ type: USER_LOGIN_FAIL, 
                payload: err.response && err.response.data.message 
                ?  err.response.data.message : 
                err.message})
  }
}

export const logout = () => (dispatch) => {
  localStorage.removeItem('userInfo');
  dispatch({ type: MY_ORDER_LIST_RESET });
  dispatch({ type: USER_DETAILS_RESET });
  dispatch({ type: USER_LOGOUT});
}

export const register = (name, email, password) => async (dispatch) => {
  
  try {
    dispatch({
      type: USER_REGISTER_REQUEST
    })

    //Config object for request headers
    const config = {
      headers: {
        'Content-Type' : 'application/json'
      }
    }

    const { data } = await axios.post(`${BACKEND_URL}api/users`, { name, email, password }, config);

    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data
    })

    //Login straight away on successful register
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data
    })

    localStorage.setItem('userInfo', JSON.stringify(data))

  } catch (err) {
    dispatch({ type: USER_REGISTER_FAIL, 
                payload: err.response && err.response.data.message 
                ?  err.response.data.message : 
                err.message})
  }
}

export const getUserDetails = (id) => async (dispatch, getState) => {
  
  try {
    dispatch({
      type: USER_DETAILS_REQUEST
    })

    const { userLogin: { userInfo} } = getState(); //<-- Double destructure

    //Config object for request headers
    const config = {
      headers: {
        'Content-Type' : 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    }

    const { data } = await axios.get(`${BACKEND_URL}api/users/${id}`, config);

    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data
    })

  } catch (err) {
    dispatch({ type: USER_DETAILS_FAIL, 
                payload: err.response && err.response.data.message 
                ?  err.response.data.message : 
                err.message})
  }
}

export const updateUserProfile = (user) => async (dispatch, getState) => {
  
  try {
    dispatch({
      type: USER_UPDATE_PROFILE_REQUEST
    })

    const { userLogin: { userInfo} } = getState(); //<-- Double destructure

    //Config object for request headers
    const config = {
      headers: {
        'Content-Type' : 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    }

    const { data } = await axios.put(`${BACKEND_URL}api/users/profile`, user, config);

    dispatch({
      type: USER_UPDATE_PROFILE_SUCCESS,
      payload: data
    })

    //Update Navbar after profile update
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data
    })

    localStorage.setItem('userInfo'. JSON.stringify(data));
    //Update Navbar after profile update

  } catch (err) {
    dispatch({ type: USER_UPDATE_PROFILE_FAIL, 
                payload: err.response && err.response.data.message 
                ?  err.response.data.message : 
                err.message})
  }
}