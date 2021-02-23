import axios from 'axios';

import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../constants/cartConstants';

const BACKEND_URL = 'http://localhost:5000/';

export const addToCart = (id, qty) => async (dispatch, getState) => {

  //Get product data from backend
  const { data } = await axios.get(`${BACKEND_URL}api/products/${id}`);

  //Add item to global cart storage (with extra details from BE)
  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty
    }
  });

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id
  })

  console.log('Remove from cart', getState().cart.cartItems);

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
}