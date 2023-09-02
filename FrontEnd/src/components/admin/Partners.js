import React from 'react'
import { Container, Row, Col, Nav, ListGroup} from 'react-bootstrap';
import PartnerDetail from './PartnerDetail';
const Partners = ()=>{
  const partnerData = [
    {
      name: "Cyntra Pvt Limited",
      id:"64df8f7ae86569fef669c042",
      wallet : "0x219c6c7EAf0333D99D54E9dF017Ce321AC5B6073"

    }
  ]
    return (

            <Col md={10}>
            <ListGroup style={{width:"70vw", margin:"2px 5px"}}>
            <div style={{fontSize:"20px", fontWeight:"bold", margin:"20px 0"}}>Total Partner : 3</div>
            {partnerData.map((data, index) => (
                <ListGroup.Item key={index} style={{ margin:"10px 0"}}>
                  <PartnerDetail customer={data}/>
          </ListGroup.Item>
        )
        )}
        
      </ListGroup>
            
          </Col>
        
    )
}

export default Partners;