import axios from 'axios';

import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL
} from '../constants/productConstants';

const BACKEND_URL = 'http://localhost:5000/';

//Redux thunk allows us to use async actions inside dispatch
export const listProducts = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST })
    const { data } = await axios.get(`${BACKEND_URL}api/products`)
    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data})
  } catch (err) {
    dispatch({ type: PRODUCT_LIST_FAIL, payload: err.response && err.response.data.message ?  err.response.data.message : err.message})
  }
}

export const listProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST })
    const { data } = await axios.get(`${BACKEND_URL}api/products/${id}`)
    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data})
  } catch (err) {
    dispatch({ type: PRODUCT_DETAILS_FAIL, payload: err.response && err.response.data.message ?  err.response.data.message : err.message})
  }
}