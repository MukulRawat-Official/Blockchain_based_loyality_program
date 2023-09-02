import React, {useState} from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import emailjs from '@emailjs/browser';
import { connectWallet } from '../walletUtil';
import send_image from "../assests/requestSend.svg"


function PartnerRegistration({ showModal, onClose }) {

    const [company,setCompany] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [send, setSend] = useState(false);
    const emailParams = {
        message: `${company} requested for to registration.\n Wallet address : ${address}\n ${email}`,
        subject: 'Reg. Partner Registration', // Replace with the desired subject
      };
      const connectingWallet = () =>{
        connectWallet().then(data=>{
            if(data) {
              setAddress(data);
             
            }
          })
      }
        const sendEmail = () => {
          const serviceId = 'service_7iap4ub'; // Replace with your actual service ID
          const templateId = 'template_e34raii'; // Replace with your actual template ID
          const userId = 'BKtuPdlnB0m02bVAx'; // Replace with your actual user ID
      
          emailjs.send(serviceId, templateId, emailParams, userId)
            .then((response) => {
              setSend(true);
              setTimeout(()=>{
                onClose()
            },3000)
            })
            .catch((error) => {
              console.error('Error sending email:', error);
            });
    }
    return (
        <Modal show={showModal} onHide={onClose} centered >
            <Modal.Header closeButton>
                <Modal.Title style={{width:"100%", textAlign:"center"}}>Register as Partner</Modal.Title>
            </Modal.Header>

            <div style={{height:"45vh"}}>
            {
                !send? (
                    <>
                    <Modal.Body >
                <Form>
                    <Form.Group controlId="companyName">
                        <Form.Label>Company Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter company name" style={{ marginBottom: '10px' }} onChange={(e)=>setCompany(e.target.value)}/>
                    </Form.Group>
                    <Form.Group controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" style={{ marginBottom: '10px' }} onChange={(e)=>setEmail(e.target.value)}/>
                    </Form.Group>
                </Form>
                {address.length>0?(<span>Account : {address}</span>):(<Button variant="primary" onClick={connectingWallet}>Connect Wallet</Button>)}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>Close</Button>
                <Button variant="primary" type="submit" onClick={sendEmail}>Connect</Button>
            </Modal.Footer>
                    </>
                ) :
                (
                    <div className='d-flex flex-column align-items-center'>

                    <img
              src={send_image} // Provide the actual path to your cart image
              alt="confirm"
              // className="cart-image"
              style={{ width: '11rem', height: '15rem' }}
              /> 
              <p style={{fontSize:"20px", fontWeight:"bold", color:"purple"}}>Request Send</p>
              </div>
                )
            }

            
            </div>
        </Modal>
    );
}

export default PartnerRegistration;
