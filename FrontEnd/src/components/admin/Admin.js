import React,{useState, useEffect} from 'react';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import {Link } from 'react-router-dom';
import AddPartner from './AddPartner';
import Partners from './Partners';
import profileAvatar from '../../assests/eliteNexus.png'; // Replace with the actual image path
import Customers from './Customers';
import Dashboard from './Dashboard';
import './admin.css'
const AdminPage = () => {
    // console.log(window.location.pathname === "/admin/add-partner")
    const [path, setPath]= useState("dashboard");

    useEffect(()=>{
      setPath(window.location.pathname)
    },[])
    
  return (
    <Container fluid>
      <Row>
        {/* Sidebar */}
        <Col md={3} className="text-white py-4 vh-100" style={{background:"#894fa2"}}> {/* Added vh-100 class */}
          <div className="d-flex flex-column align-items-center mb-4">
            <img src={profileAvatar} alt="Admin" style={{height: '10rem' }} />
            <h4>ADMIN</h4>
          </div>
          <Nav className="flex-column side-bar">
            <Nav.Link as={Link} to="/admin" onClick={()=>setPath("/admin")}>Dashboard</Nav.Link>
            <Nav.Link as={Link} to="/admin/add-partner" onClick={()=>setPath("/admin/add-partner")} >Add Partner</Nav.Link>
            <Nav.Link as={Link} to="/admin/partners" onClick={()=>setPath("/admin/partners")}>Partners</Nav.Link>
            <Nav.Link as={Link} to="/admin/customers" onClick={()=>setPath("/admin/customers")}>Customers</Nav.Link>
          </Nav>
          <div style={{position: "absolute",
    bottom: "10px",
    left: "87px",
    fontSize: "15px",
    fontWeight: "bold"}}>
            The Elite Nexus
          </div>
        </Col>
        <Col md={9}>
           
        {
           path === "/admin/add-partner" && <AddPartner/>
        }
        {
            path === "/admin/partners" && <Partners/>
        }
        {
            path === "/admin/customers" && <Customers/>
        }
        {
            path === "/admin" && <Dashboard/>
        }
            
          </Col>
        
      </Row>
    </Container>
  );
};

export default AdminPage;
