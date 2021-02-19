import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

//Allows for Redux devtools
import { composeWithDevTools } from 'redux-devtools-extension';

const reducer = combineReducers({});

const initialState = {};

//In an array to allow for future middleware to be easily added
const middleware = [thunk];

//Create store by passing the combined reducers, the initial state and any middleware
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;