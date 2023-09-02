import React, {useEffect, useState} from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import profileAvatar from '../assests/profile_avatar.png'
import {load, connectedAddress, connectWallet} from '../walletUtil'

const Header = () => {
  const [profile,setProfile] = useState('PROFILE');
  const [token,setToken] = useState(0);
  const [connected,setConnected] = useState(false)
  const navbarStyle = {
    backgroundColor: '#f0f0f0', // Set your desired background color
  };
  const profileImageStyle = {
    width: '3.2rem', // Adjust the width of the image
    height: '3.2rem', // Adjust the height of the image
    marginLeft: '5px', // Add some space between the text and the image
    borderRadius: '50%'
  };
  // Retrieve data from local storage
  useEffect(()=>{

    connectedAddress().then(data=>{
      if(data) {
        setConnected(true);
        load(data).then(res => setToken(Math.round(res)));
      }
    })
   
  },[])

  const handleConnect = () =>{
    const wallet = localStorage.getItem('wallet');
    if(wallet.length>0) connectWallet();
    else alert("not registered")
  }

  return (
    <Navbar style={navbarStyle}>
      <Container>
        <Navbar.Brand href="/">HOME</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/product">PRODUCT</Nav.Link>
          <Nav.Link href="/login">LOGIN</Nav.Link>
          <Nav.Link href="/register">REGISTER</Nav.Link>
        </Nav>
        <Nav>
          <div className='d-flex align-items-center'>
            {
              connected? (<span>{token} 🪙</span>) : (<button className="btn btn-primary" style={{background: "#894fa2", border:"none"}} onClick={handleConnect}>Connect</button>)
            }
          
          <Nav.Link href="/profile"><img src={profileAvatar} alt="Profile" style={profileImageStyle} /></Nav.Link>
          </div>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;
