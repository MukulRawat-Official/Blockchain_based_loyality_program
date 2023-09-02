import React, { useEffect, useState } from 'react';
import { ListGroup, Button } from 'react-bootstrap';
import { fetchProducts } from '../api';
import OrderCancellation from './OrderCancellation';

function OrderHistory({ order}) {
    
    const [product, setProduct] = useState({});
    useEffect(() => {
        console.log(order)
        fetchProducts().then(data => {
            const p = data.find(prod => {
                if (order)
                    return prod.id === Number(order.product);
                else return null;
            });
            console.log(p)
            if (p) setProduct(p);
        });
    }, []);

    function formatTimestamp(timestamp) {
        // ... (your formatTimestamp function)
    }

    function cancelOrder() {
        // Handle the cancellation logic here
        console.log('Order Canceled');
        setShowModal(true);
    }

    const [showModal, setShowModal] = useState(false);

    const handleModalClose = () => {
        setShowModal(false);
    };

    const handleCancelClick = () => {
        setShowModal(true);
    };

    return (
        <>
        <ListGroup.Item>
            <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                    <img
                        src={product.image} // Replace with the actual image source
                        alt={product.title}
                        style={{ width: '100px', height: '100px', marginRight: '10px' ,filter: 'drop-shadow(2px 4px 5px #757474)' }}
                        />
                    <div>
                        <h6>{product.title}</h6>
                        <p>Rs. {product.price}</p>
                    </div>
                </div>
                <div>
                    {order.status === "order"?(<Button variant="danger" onClick={cancelOrder}>Cancel Order</Button>):(<p>Cancelled</p>)}
                    {/* <Button variant="danger" onClick={cancelOrder}>Cancel Order</Button> */}
                </div>
            </div>
        </ListGroup.Item>
        <OrderCancellation
                show={showModal}
                onHide={handleModalClose}
                orderDetails={product}
                id = {order.id} // Pass order details as props
            />
                        </>
    );
}

export default OrderHistory;
