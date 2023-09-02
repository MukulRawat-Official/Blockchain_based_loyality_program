import React,{useEffect, useState} from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { ListGroup } from 'react-bootstrap';
import RewardHistoryItem from '../../components/history'
function CustomerModal({ show, handleClose, customerData }) {
    console.log(customerData)
    return (
        <Modal show={show} onHide={handleClose}>
         
            <Modal.Header closeButton>
                <Modal.Title>Purchase Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <ListGroup variant="flush">
                {customerData.map((reward,key) => (
                 <RewardHistoryItem key={key} reward={reward} />
                ))}
              </ListGroup>
               
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
          
        </Modal>
    );
}

export default CustomerModal;
