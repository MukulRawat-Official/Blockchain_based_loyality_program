import React,{useEffect, useState} from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { ListGroup } from 'react-bootstrap';
import { grantTokens } from '../../walletUtil';
function PartnerModal({ show, handleClose, customerData, balance, granted,address }) {
    const [token,setToken] = useState(0);
    console.log(customerData)
    function formatDateAndTime(timestamp) {
        const date = new Date(timestamp*1000);
    
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
    
        return `${day}-${month}-${year} ${hours}h-${minutes}m-${seconds}s`;

        
    }
    const handleGrantToken = () =>{
        if(token>0){
           grantTokens("0x219c6c7EAf0333D99D54E9dF017Ce321AC5B6073",token).then(data=>console.log(data));
        }
    }
    return (
        <Modal show={show} onHide={handleClose}>
         
            <Modal.Header closeButton>
                <Modal.Title  style={{alignText:"center", width:"100%"}} >Partner Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='d-flex flex-row justify-content-around'>

                <div className='partner-card'>Balance : <p>{balance} <span style={{fontSize:"20px"}} className='rotate-text'>🪙</span></p></div>
                <div className='partner-card'>Total Granted :<p>{granted} <span style={{fontSize:"20px"}} className='rotate-text'>🪙</span></p></div>
                </div> 
                <div className='d-flex justify-content-around'>
                <input
                        type="number"
                        
                        style={{width:"10rem"}}
                        onChange={(e)=>setToken(e.target.value)}
                        />
                    <Button style={{background: "#894fa2", border:"none",width:"10rem"}} onClick={handleGrantToken} >Grant Token</Button>
                </div>
                <div className='list-container'>

            <ListGroup variant="flush">
            {customerData.map((customer, index) => (
                <ListGroup.Item key={index} style={{ margin:"10px 0"}} className='d-flex flex-row justify-content-around'>
                  <span style={{color:"green", fontWeight:"bold"}}>{customer.amount} 🪙</span>
                  <span>Granted on : {formatDateAndTime(customer.time)}</span>
          </ListGroup.Item>
        )
        )}
              </ListGroup>
        </div>
               
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
          
        </Modal>
    );
}

export default PartnerModal;
