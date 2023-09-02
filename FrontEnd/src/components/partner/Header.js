import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';

const Header = ()=> {
    return (
        <Navbar style={{position:"fixed", width:"100vw" , background:"rgb(237 237 237)"}}>
            <Container>
                <Navbar.Brand href="#home">Cyntra Pvt</Navbar.Brand>
                <Nav className="ml-auto" style={{color:"white"}}>
                    <a style={{color:"black", textDecoration:"none", fontWeight:"bold"}}href='#dashboard'>Dashboard</a>
                </Nav>
            </Container>
        </Navbar>
    );
}

export default Header;
