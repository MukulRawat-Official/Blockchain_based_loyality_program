import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './test.css'

const ProductCard = ({ product }) => {
  const cardImgStyle = {
    backgroundSize: 'contain', // Adjust the background size property
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    height: '200px',
    filter: 'drop-shadow(4px 4px 8px )'
  };

  const cardStyle = {
    // backgroundColor: 'rgb(158, 115, 247)'
    background: 'linear-gradient(rgb(105 27 138), rgb(202 199 203))',
    height:'100%'
  }

  const bottomCardStyle = {
    
    position: 'absolute',
    width: '100%',
    bottom: '-200px',
  }

  return (
    <Card className="mb-4" style={{height:'400px'}}>
    <Card className="rounded-top shadow-sm" style={{height:'100%'}}>
        <div className="rounded-top d-flex justify-content-center align-items-center" style={cardStyle}>
            <img style={cardImgStyle} src={product.image} alt='product' />
        </div>
    </Card>
    <Card className="rounded-bottom">
        <Card.Body>
                <Card.Title>{product.title}</Card.Title>
            <Row>
                <Col xs={6}>
                    <Card.Text>Price: ₹{product.price}</Card.Text>
                </Col>
                <Col xs={6} className="d-flex justify-content-end">
                    {/* Add Buy Now button */}
                    <Link to={`/product/${product.id}`} className="btn btn-primary" style={{background: "#894fa2", border:"none"}}>Buy Now</Link>
                </Col>
            </Row>
        </Card.Body>
    </Card>
</Card>
  );
};

export default ProductCard;
