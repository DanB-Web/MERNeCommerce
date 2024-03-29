import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { Container } from 'react-bootstrap';

import Header from './components/Header';
import LoginScreen from './screens/LoginScreen';
import ProfileScreen from './screens/ProfileScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen'
import HomeScreen from './screens/HomeScreen';
import Footer from './components/Footer';

const App = () => {

  return (
    <Router>
      <Header/>
      <main className="py-3">
        <Container>
          <Route path="/login" component={LoginScreen}/>  
          <Route path="/profile" component={ProfileScreen}/>  
          <Route path="/shipping" component={ShippingScreen}/>  
          <Route path="/payment" component={PaymentScreen}/>  
          <Route path="/placeorder" component={PlaceOrderScreen}/>  
          <Route path="/order/:id" component={OrderScreen}/>  
          <Route path="/register" component={RegisterScreen}/>  
          <Route path="/product/:id" component={ProductScreen}/>
          <Route path="/cart/:id?" component={CartScreen}/>
          <Route path="/" component={HomeScreen} exact/>
        </Container>
      </main>
      <Footer/>
    </Router>
  );

}

export default App;
