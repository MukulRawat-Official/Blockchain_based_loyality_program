import React, { useState } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import register_image from '../assests/register.svg'
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    // Add your registration logic here
    // ...

    navigate('/product');
  };

  return (
    <Container className="d-flex align-items-center vh-70" style={{height:"80vh"}}>
      <Row style={{width:"100%"}}>
      <h2 className="mb-4">Register</h2>
      <Col md={6} className="d-flex align-items-end">
          <img src={register_image} alt="register" className="img-fluid" style={{width:"70%"}} />
        </Col>
        <Col md={6} className="" >
          <div style={{ boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.2)', padding: '20px', borderRadius:"2%", width:"85%"}}>
            
            <Form onSubmit={handleRegister}>
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

              <Form.Group controlId="email" className='my-2'>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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

              <Form.Group controlId="confirmPassword" className='my-2'>
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </Form.Group>

              <Button variant="primary" type="submit" className="" style={{background: "#894fa2", border:"none",margin:"10px 0"}}>
                Register
              </Button>
            </Form>
          </div>
        </Col>
        
      </Row>
    </Container>
  );
};

export default Register;
