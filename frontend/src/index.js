import React from 'react';
import ReactDOM from 'react-dom';

//Import Provider from react-redux and pass it the state store
import { Provider } from 'react-redux';
import store from './store.js';

//App wide styles
import './bootstrap.min.css'
import './index.css';

import App from './App';
//import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

//reportWebVitals();
