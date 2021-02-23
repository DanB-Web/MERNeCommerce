import axios from 'axios';

import { 
    USER_LOGIN_REQUEST, 
    USER_LOGIN_SUCCESS, 
    USER_LOGIN_FAIL } from '../constants/userConstants';

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