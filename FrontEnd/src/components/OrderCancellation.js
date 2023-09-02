import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { cancelOrder } from '../walletUtil';

function OrderCancellation({ show, onHide, orderDetails, id }) {
    const customerId = localStorage.getItem("id");
    const from = localStorage.getItem('wallet');
    const cancel = ()=>{
        fetch('http://127.0.0.1:3001/action',{
      method:'PUT',
      headers:{
                'Content-Type':'application/json'
      },
      body:JSON.stringify({
        _id : customerId,
        orderId : id,
        status : "cancel"
        
      })
    }).then(response=>{
      if(response.status===201){
        cancelOrder(from,id);
        response.json().then(data=>localStorage.setItem('orders', JSON.stringify(data)))
      }
    })
    }
    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Cancel Order</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <div className="d-flex align-items-center">
        <img
            src={orderDetails.image} // Replace with the actual image source
            alt={orderDetails.productName}
            style={{ width: '50px', height: '50px', marginRight: '10px' }}
        />
        <div>
            <h6>{orderDetails.title}</h6>
            <p>Price: Rs. {orderDetails.price}</p>
        </div>
    </div>
    {/* Other order details */}
    <p>Order ID: {id}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>Close</Button>
                <Button variant="danger" onClick={cancel}>Cancel Order</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default OrderCancellation;
