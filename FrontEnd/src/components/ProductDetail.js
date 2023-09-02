import React, { useState, useEffect } from 'react';
import { Card, Button, Modal, Form, ButtonGroup, Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { fetchProducts } from '../api';
import profileAvatar from '../assests/profile_avatar.png'
import CustomModal from './customModal';
import confirm_image from '../assests/confirm.png'
import { connectedAddress,pay, ownerAddress, addTransaction} from '../walletUtil'
import { generateUniqueHash } from '../utils';


import './test.css'

const ProductDetail = () => {
  const { Id } = useParams();
  const [product, setProduct] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [address, setAddress] = useState('');
  const [pincode,setPincode] = useState('')
  const [state, setState] = useState('');
  const [city, setCity] = useState();
  const [quantity,setQuantity] = useState(1);
  const [confirm, setConfirm] = useState(false);
  const [buyButton, setBuyButton] = useState("Pay using 🪙")
  const [connected, setConnected] = useState(false)
  const [finalAmount, setFinalAmount] = useState("");
  const [useReward, setUseReward] = useState(false);
  const [usableReward, setUsableReward] = useState(0);
  const [account,setAccount] = useState("");

  useEffect(() => {
    fetchProducts().then(data => {
      const p = data.find(prod => prod.id === Number(Id));
      setProduct(p);
      setFinalAmount(product.price)
      
    });
    ownerAddress().then(data=>console.log(data))
  }, [Id]);

  const handleBuyClick = () => {
    setFinalAmount(product.price)
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleConfirmOrder = () => {
    const id = localStorage.getItem("id");
    setUsableReward(calc(product.price)[1]);
    const hash  = generateUniqueHash();

   
      ownerAddress().then(addr=>{
        if(addr.length>0 && account.length>0){
          pay("0x219c6c7EAf0333D99D54E9dF017Ce321AC5B6073","0xb764C0B208D08F8A397991d995883a4aae95518f",hash,3).then(res=>{
            setConfirm(true)
            console.log(res)
          })
        }
        else{
          alert("fucked up")
        }
      })
    
    fetch('http://127.0.0.1:3001/ordered',{
      method:'PUT',
      headers:{
                'Content-Type':'application/json'
      },
      body:JSON.stringify({
        _id : id,
        order : {
          id : hash,
          product : Id,
          status : "order"
        }
      })
    }).then(response=>{
      if(response.status===201){
        response.json().then(data=>localStorage.setItem('orders', JSON.stringify(data)))
        
      }
      else alert('not registered')
    })
    const now = new Date();
    const futureTimestamp = now.getTime() + 7 * 24 * 60 * 60 * 1000;
    addTransaction("0x219c6c7EAf0333D99D54E9dF017Ce321AC5B6073",hash,Number(product.price), futureTimestamp).then(res=>console.log(res));

    // close the modal are successful order
    setTimeout(()=>{

      setShowModal(false);
      setConfirm(false)
    },5000)


  };
  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handlePay = async () =>{
    const from = localStorage.getItem("wallet")
    // pay(from, "0x89834C01Eb9Db1B5247956D2618Cb36C93414C66",2000000).then(data=>console.log(data))
    connectedAddress().then(res=>{
      if(res){
        if(res !== from) alert("not registered")
        else {
            setAccount(from);
            setShowModal(true);
            setFinalAmount(calc(product.price)[0]+"+"+calc(product.price)[1]+"🪙")
            setUseReward(true);
      }
      }
      else{
        setConnected(true)
        setTimeout(()=>setConnected(false), 5000);
      }
    })
   
  }
  if (!product) {
    return <div>Product not found.</div>;
  }

  const  calc = (x)=>{
    let a = Number(x);
     a = a*0.1;  // 10% of the amount
    a = Math.ceil(a);
    let token = Math.ceil(a/100);
    if(token>50) token=50;
    
    return [x-token*100, token];
}
 const calReward = (x)=>{
  let a = Number(x);
  a = Math.ceil(a/100);
  if(a>50) a = 50;
  return a;
 }
  return (
    <>
    {
      connected && (
      <CustomModal message="fuck you"/>)
    }
       <Card className=" w-90 d-flex justify-content-center flex-row"  style={{margin: '20px', border : 'none',backgroundColor: 'rgb(240, 240, 240)', height:'60vh'}}>
      <Row className="" style={{width:"80%"}}>
        <h4>Product Details</h4>
        <Col xs={6} className="p-0 d-flex justify-content-center " style={{height:"100%"}} >
          <Card.Img
            variant="left"
            src={product.image}
            alt={product.name}
            style={{filter: 'drop-shadow(rgb(118,118,118,1) 2px 40px 30px)',
            height: '100%'}}
          />
        </Col>
        <Col xs={6} className="d-flex flex-column justify-content-between">

          <Card.Title>{product.title}</Card.Title>
          <Card.Text>{product.description}</Card.Text>
          <div>

          <Card.Text style={{fontWeight:"bold", fontSize:"24px", margin:"0"}}>₹{product.price}</Card.Text>
          <Card.Text style={{fontSize:"16px", margin:"0"}}>or PAY ₹{calc(product.price)[0]} + {calc(product.price)[1]}🪙</Card.Text>
          <div className='text-center' style={{ margin: '10px 0', backgroundColor: 'rgb(197 197 197 / 95%)',  borderRadius: '3px' }}>You will save {calReward(product.price)} 🪙 on this purchase</div>
          </div>
         
          <div className='mb-2 d-flex justify-content-between'>

          <div>

          <Button variant="primary" style={{background: "#894fa2", border:"none",margin:"5px"}} onClick={handleBuyClick}>
            Buy
          </Button>
          <Button variant="primary" style={{background: "#894fa2", border:"none",margin:"5px"}} onClick={handlePay}>
            {buyButton}
          </Button>
          </div>
          <ButtonGroup className="mb-2 d-flex justify-content-between">
          
            <Button variant="outline-secondary" onClick={handleDecrement}>
              -
            </Button>
            <Button variant="secondary">{quantity}</Button>
            <Button variant="outline-secondary" onClick={handleIncrement}>
              +
            </Button>
          </ButtonGroup>
          </div>
        </Col>
      </Row>
    </Card>
















      {showModal && <div className="overlay"></div>}
      <Modal centered show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>
          {/* <div className="cart-image-container">
            <img
              src={profileAvatar} // Provide the actual path to your cart image
              alt="Cart"
              className="cart-image"
            />
          </div> */}
            Confirm Order
          </Modal.Title>
        </Modal.Header>
        {
          confirm? (
            <Modal.Body style={{ width: '30em', height: '24em' }}>
          <div className="text-center">
          <img
              src={confirm_image} // Provide the actual path to your cart image
              alt="confirm"
              // className="cart-image"
              style={{ width: '11rem', height: '15rem' }}
            />
          </div>
         





        </Modal.Body>
          ):(
            <>
            <Modal.Body style={{ width: '30em', height: '20em' }}>
         
          <Form>
          <Form.Group controlId="address">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="city">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="state">
              <Form.Label>State</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your state"
                value={state}
                onChange={(e) => setState(e.target.value)}
                required
                />
            </Form.Group>
            <Form.Group controlId="pincode">
              <Form.Label>Pincode</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your pincode"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                required
                />
            </Form.Group>
          </Form>
         
        </Modal.Body>
        <Modal.Footer>
          <span>₹{finalAmount}</span>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleConfirmOrder} style={{background: "#894fa2", border:"none"}}>
            Confirm Order
          </Button>
        </Modal.Footer>
        </>
          )
        }
      </Modal>
    </>
  );
};

export default ProductDetail;
