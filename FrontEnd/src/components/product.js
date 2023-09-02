import React, { useEffect, useState } from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProductCard from './card';
import { fetchProducts } from '../api';


const Product = () => {
    const [products,setProducts] = useState([]);
    useEffect(()=>{
      fetchProducts().then(data=>setProducts(data));

        // setProducts(fetchProducts)
        // console.log(fetchProducts);
    },[])
    const rowStyle = {
      margin: '0 10px'
    }
  return (
    
    <Container className="product-container mx-10">
        <Row style={rowStyle}>
        <h2>Featured Products</h2>
          {products.map((product, index) => (
            <Col key={index} sm={6} md={4} lg={4} className="mb-4">
              <ProductCard product={product} />
            </Col>
          ))}
        </Row>
      </Container>
  );
};

export default Product;
