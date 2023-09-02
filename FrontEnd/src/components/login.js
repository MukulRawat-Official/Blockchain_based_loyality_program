import React, { useState } from 'react';
import { Container, Card, Form, Button, Row, Col } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import login_image from '../assests/login.svg'
const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();
    // Here, you can add your logic to handle login
    console.log('Username:', username);
    console.log('Password:', password);


    fetch('http://127.0.0.1:3001/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email : username,
        password : password
      })
    }).then(response => {

      if (response.status === 200) {
        response.json().then(data => {
          localStorage.clear()
          // localStorage.setItem('data', JSON.stringify(data))
          localStorage.setItem('id',data._id);
          localStorage.setItem('name', data.name);
          localStorage.setItem('wallet', data.walletAddress);
          localStorage.setItem('orders', JSON.stringify(data.orders));
          navigate('/product')
        }
        )
      }
      else if (response.status === 500) {
        alert('user is not registered')
      }

      else {
        alert('incorrect password')
      }
    })
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100" style={{height:"80vh"}}>
        <Row>
              <h2 className="mb-4">Log In</h2>
          <Col md={6} className="p-4">
            <img src={login_image} alt="Login" className="img-fluid" style={{height:"70%"}} />
          </Col>
          <Col md={6} className="p-4" style={{ boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.2)', padding: '20px', borderRadius:"2%", width:"42%", height:"50%"}}>

              <Form onSubmit={handleLogin}>
                <Form.Group controlId="username" className='my-2'> 
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="password" className='my-2'>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>

                <Button variant="primary" type="submit" className="" style={{background: "#894fa2", border:"none",margin:"10px 0"}}>
                  Log In
                </Button>
              </Form>
          </Col>
        </Row>
    </Container>
  );
};

export default Login;
