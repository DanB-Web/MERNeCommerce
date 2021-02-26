import axios from 'axios';

import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_FAIL,
  MY_ORDER_LIST_REQUEST,
  MY_ORDER_LIST_SUCCESS,
  MY_ORDER_LIST_FAIL
} from '../constants/orderConstants';

const BACKEND_URL = 'http://localhost:5000/';

export const createOrder = (order) => async (dispatch, getState) => {
  
  try {
    dispatch({
      type: ORDER_CREATE_REQUEST
    })

    const { userLogin: { userInfo } } = getState(); //<-- Double destructure

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

export const getOrderDetails = (id) => async (dispatch, getState) => {
  
  try {
    dispatch({
      type: ORDER_DETAILS_REQUEST
    })

    const { userLogin: { userInfo } } = getState(); //<-- Double destructure

    //Config object for request headers
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    }

    const { data } = await axios.get(`${BACKEND_URL}api/orders/${id}`, config);

    dispatch({
      type: ORDER_DETAILS_SUCCESS,
      payload: data
    })
  } catch (err) {
    dispatch({ type: ORDER_DETAILS_FAIL, 
                payload: err.response && err.response.data.message 
                ?  err.response.data.message : 
                err.message})
  }
}

export const payOrder = (orderId, paymentResult) => async (dispatch, getState) => {
  
  try {
    dispatch({
      type: ORDER_PAY_REQUEST
    })

    const { userLogin: { userInfo } } = getState(); //<-- Double destructure

    //Config object for request headers
    const config = {
      headers: {
        'Content-Type' : 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    }

    const { data } = await axios.put(`${BACKEND_URL}api/orders/${orderId}/pay`, paymentResult, config);

    dispatch({
      type: ORDER_PAY_SUCCESS,
      payload: data
    })
  } catch (err) {
    dispatch({ type: ORDER_PAY_FAIL, 
                payload: err.response && err.response.data.message 
                ?  err.response.data.message : 
                err.message})
  }
}

export const listMyOrders = () => async (dispatch, getState) => {
  
  try {
    dispatch({
      type: MY_ORDER_LIST_REQUEST
    })

    const { userLogin: { userInfo } } = getState(); //<-- Double destructure

    //Config object for request headers
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    }

    const { data } = await axios.get(`${BACKEND_URL}api/orders/myorders`, config);

    console.log('myOrders', data);

    dispatch({
      type: MY_ORDER_LIST_SUCCESS,
      payload: data
    })
  } catch (err) {
    dispatch({ type: MY_ORDER_LIST_FAIL, 
                payload: err.response && err.response.data.message 
                ?  err.response.data.message : 
                err.message})
  }
}