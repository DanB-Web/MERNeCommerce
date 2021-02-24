import axios from 'axios';

import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL
} from '../constants/orderConstants';

const BACKEND_URL = 'http://localhost:5000/';

export const createOrder = (order) => async (dispatch, getState) => {
  
  try {
    dispatch({
      type: ORDER_CREATE_REQUEST
    })

    const { userLogin: { userInfo} } = getState(); //<-- Double destructure

    //Config object for request headers
    const config = {
      headers: {
        'Content-Type' : 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    }

    const { data } = await axios.post(`${BACKEND_URL}api/orders`, order, config);

    dispatch({
      type: ORDER_CREATE_SUCCESS,
      payload: data
    })
  } catch (err) {
    dispatch({ type: ORDER_CREATE_FAIL, 
                payload: err.response && err.response.data.message 
                ?  err.response.data.message : 
                err.message})
  }
}