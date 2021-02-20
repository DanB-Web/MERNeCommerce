import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';

import { Row, Col } from 'react-bootstrap';

import Product from '../components/Product';
import Message from '../components/Message';
import Loader from '../components/Loader';

const HomeScreen = () => {

  const dispatch = useDispatch();
  
  //Get state and destructure 
  const productList = useSelector(state => state.productList);
  const { loading, error, products } = productList; 

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <>
      <h1>Latest Products</h1>
      {loading ? <Loader/> : 
       error ? <Message varient="danger"> {error} </Message>:
      <Row>
        {products.map((product, index) => (
          <Col key={index} sm={12} md={6} lg={4} xl={3}>
            <Product product={product}/>
          </Col>
        ))}
      </Row>} 
    </>
  )
}

export default HomeScreen
