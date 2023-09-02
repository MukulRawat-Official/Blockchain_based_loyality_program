import React, {useState, useEffect} from 'react'
import { Container, Row, Col, Nav, ListGroup } from 'react-bootstrap';
import { customerCount, getTransaction, customers } from '../../walletUtil';
import CustomerDetails from './CustomerDetails';
const Customers = ()=>{
  const [customerData,setCustomerData] = useState([]);
  const [totalCustomer, setTotalCustomer] = useState(0);
useEffect(()=>{
  customerCount().then(data=>setTotalCustomer(Number(data)));
  customers().then(data=>setCustomerData(data));
},[])
  
    return (

            <Col md={10}>
            <ListGroup style={{width:"70vw", margin:"2px 5px"}}>
            <div style={{fontSize:"20px", fontWeight:"bold", margin:"20px 0"}}>Total Customer : {totalCustomer}</div>
            {customerData.map((customer, index) => (
                <ListGroup.Item key={index} style={{ margin:"10px 0"}}>
                  <CustomerDetails customer={customer}/>
          </ListGroup.Item>
        )
        )}
        
      </ListGroup>
            
          </Col>
        
    )
}

export default Customers;