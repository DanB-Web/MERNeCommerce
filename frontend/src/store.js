//Import Redux dependencies - applyMiddleware for thunk
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';  //Allows for async actions inside reducers

//Import reducers
import { productListReducer, productDetailsReducer } from './reducers/productReducers.js';
import { cartReducer } from './reducers/cartReducers.js';
import { userLoginReducer } from './reducers/userReducers.js'

//Allows for Redux devtools
import { composeWithDevTools } from 'redux-devtools-extension';

//Rename reducers to more practical state names and combine
const reducer = combineReducers({
  productList: productListReducer,
  productDetails : productDetailsReducer,
  cart: cartReducer,
  userLogin: userLoginReducer
});

const cartItemsFromStorage = localStorage.getItem('cartItems') 
  ? JSON.parse(localStorage.getItem('cartItems')) 
  : [];

const userInfoFromStorage = localStorage.getItem('userInfo') 
  ? JSON.parse(localStorage.getItem('userInfo')) 
  : null;

const initialState = {
  cart: { cartItems: cartItemsFromStorage},
  userLogin : { userInfo: userInfoFromStorage}
};

//In an array to allow for future middleware to be easily added
const middleware = [thunk];

//Create store by passing the combined reducers, the initial state and any middleware
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store