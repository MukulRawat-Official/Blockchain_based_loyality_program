import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddPartner_image from "../../assests/addPartner.svg"
import Approve_image from "../../assests/approve.svg"
import {Col} from 'react-bootstrap'
import { addPartner } from '../../walletUtil';
const AddPartner = ()=>{
    const [name,setName] =useState();
    const [email,setEmail] = useState();
    const [wallet,setWallet] =useState("");
    const [renderImg, setRenderImg] = useState(AddPartner_image);

    const handleSubmit = () =>{
      
      fetch('http://127.0.0.1:3001/register-partner', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name : name,
        email : email,
        walletAddress : wallet
      })
    }).then(res=>{
      if(res.status===201){
        res.json().then(data=>console.log(data))
      }
    })
    addPartner("0x219c6c7EAf0333D99D54E9dF017Ce321AC5B6073").then(data=>{
      setRenderImg(Approve_image);
      console.log(data)
    })
    }

    

    return (
      <Col md={10} className='d-flex align-items-center align-content-between justify-content-evenly h-100' style={{width:"70vw"}}>
        <div style={{height:"50%", width:"40%"}}>

        <Form>
            <Form.Group controlId="companyName" style={{margin:"2px 0"}}>
                <Form.Label>Company Name</Form.Label>
                <Form.Control
                    type="text"
                    name="companyName"
                    placeholder="Enter company name"
                    onChange={(e)=>setName(e.target.value)}
                    required
                />
            </Form.Group>

            <Form.Group controlId="email" style={{margin:"2px 0"}}>
                <Form.Label>Email</Form.Label>
                <Form.Control
                    type="email"
                    name="email"
                    placeholder="Enter email"
                    onChange={(e)=>setEmail(e.target.value)}
                    required
                />
            </Form.Group>

            <Form.Group controlId="walletAddress" style={{margin:"2px 0"}}>
                <Form.Label>Wallet Address</Form.Label>
                <Form.Control
                    type="text"
                    name="walletAddress"
                    placeholder="Enter Wallet Address"
                    onChange={(e)=>setWallet(e.target.value)}
                    required
                />
            </Form.Group>

            <Button style={{background: "#894fa2", border:"none" , margin:"10px 0"}} onClick={handleSubmit}>
                Submit
            </Button>
        </Form>
          </div>
        <div className='d-flex' style={{height:"50%", width:"40%"}}>
        <img
                        src={renderImg}
                        alt="Home"
                        className="img-fluid"
                    />
        </div>
        </Col>
    );
}

export default AddPartner;

