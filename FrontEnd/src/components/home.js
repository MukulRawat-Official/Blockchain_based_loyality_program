import React, {useState} from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import shopping from '../assests/shopping.svg'
import PartnerRegistration from './PartnerRegisteration';

function Home() {
  const [showModal, setShowModal] = useState(false);

    const handleModalClose = () => {
        setShowModal(false);
    };

    const register = () => {
        setShowModal(true);
    };
    return (
      <>
        <Container>
            <Row>
                <Col md={6} className="">
                    <div className="d-flex flex-column justify-content-evenly" style={{height:"80vh"}}>
                      <div style={{fontSize:"60px", fontWeight:"bold", margin:"0"}}>
                        <p style={{ margin:"0"}}>Welcome</p>
                        <p style={{margin:"0"}}>To</p>
                        <p style={{margin:"0"}}>Elite Store</p>
                      </div>
                      <div style={{color: "#8132a2",
    fontWeight: "bold",
    textTransform: "capitalize"}}>
                        <p style={{ margin:"0"}}>Experience shopping like never before,</p>
                        <p style={{ margin:"0"}}>with the elegance of blockchain innovation.</p>
                      </div>
                      <div>

                        <Button variant="primary" className="mr-3" style={{ marginRight:"5px", background: "#894fa2",
    border: "purple",
    padding: "10px"}} onClick={register}>Register as Partner</Button>
                   
                        <Link to={`/product`} className='btn btn-secondary' style={{ marginLeft:"5px" ,padding: "10px",
    border: "none",
    background: "#2f2e43"}} >  Go to Store</Link>
                      </div>
                    </div>
                </Col>
                <Col md={6} className="d-flex align-items-center">
                    <img
                        src={shopping}
                        alt="Home"
                        className="img-fluid"
                    />
                </Col>
            </Row>
        </Container>

<PartnerRegistration showModal={showModal} onClose={handleModalClose} />
      </>
    );
}

export default Home;
