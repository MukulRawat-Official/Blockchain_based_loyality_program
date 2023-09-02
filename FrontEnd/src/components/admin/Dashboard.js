import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Nav , Card, Button, Modal} from 'react-bootstrap';
import { getToBeMint,load, getIncentive,getMaxIncentive, customerCount, mintCoin, crediToken} from '../../walletUtil';
import './admin.css'

const Dashboard = ()=>{
  const [mintToken, setMintToken]= useState(0);
  const [balance, setBalance] = useState(0);
  const [currentIncentive, setCurrentIncentive]=useState(0);
  const [currentMaxIncentive, setCurrentMaxIncentive] = useState(0);
  const [customers, setCustomers] = useState(0);

  const [showModal, setShowModal] = useState(false);

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

  useEffect(()=>{
    getToBeMint().then(data=>setMintToken(Number(data)))
    load("0xb764C0B208D08F8A397991d995883a4aae95518f").then(data=>setBalance(data))
    getIncentive().then(data=>setCurrentIncentive(Number(data)));
    getMaxIncentive().then(data=>setCurrentMaxIncentive(Number(data)))
    customerCount().then(data=>setCustomers(Number(data)))

  })
  const handleMint = () =>{
    mintCoin(85).then(data=>console.log(data));
  }
  const handleCreditToken = () =>{
        crediToken().then(data=>console.log(data))
  }
    return (

            <Col md={10}  style={{height:"100vh"}}>
            <div style={{width:"70vw"}}>
            <Row className='d-flex flex-row align-content-center justify-content-center align-items-center' style={{height:"100vh"}}>
                
                    
                    <Col  md={6} className='dash-col'>
                        <Card className='dash-card-d' onClick={handleOpenModal}>
                            <Card.Body>
                                <Card.Title style={{    color: "#5e005e",fontWeight: "bold"}}>Total Customers</Card.Title>
                                <Card.Text>3</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col  md={6} className='dash-col'>
                        <Card className='dash-card-d'>
                            <Card.Body>
                                <Card.Title style={{    color: "#5e005e",fontWeight: "bold"}}>Total Partners</Card.Title>
                                <Card.Text>2</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col  md={6} className='dash-col' style={{    color: "#5e005e"}}>
                        <Card className='dash-card'>
                            <Card.Body>
                                <Card.Title style={{    color: "#5e005e",fontWeight: "bold"}}>To Be Mint </Card.Title>
                                <div className='d-flex flex-column justify-content-end' style={{height:"75%"}}>

                                <div className='d-flex justify-content-between' style={{margin:"3px 0"}}>
                               0 🪙
                                <Button style={{background: "#894fa2", border:"none"}} onClick={handleMint}>Mint 🪙</Button>

                                </div>
                                <div className='d-flex justify-content-between' style={{margin:"3px 0"}}>

                                <input
                        type="number"
                        value=""
                        style={{width:"40%"}}
                        />
                    <Button style={{background: "#894fa2", border:"none"}}>Mint 🪙</Button>
                        </div>
                        </div> 
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col  md={6} className='dash-col'>
                        <Card className='dash-card' >
                            <Card.Body>
                                <Card.Title style={{    color: "#5e005e",fontWeight: "bold"}}>Balance</Card.Title>
                                <div className='d-flex align-items-center justify-content-center' style={{height:"75%"}}>

                                <span style={{fontSize:"25px" , fontWeight:"bold"}}>{balance}</span>
                                <span style={{fontSize:"80px"}} className='rotate-text'>🪙</span>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                    
                    <Col  md={6} className='dash-col'>
                        <Card className='dash-card'>
                            <Card.Body className='d-flex flex-column justify-content-between'>
                                <Card.Title style={{    color: "#5e005e",fontWeight: "bold"}}>Incentive</Card.Title>
                                <Card.Text>{currentIncentive}🪙 per Rs 100</Card.Text>
                                <div className='d-flex justify-content-between' style={{margin:"4px 0"}}>

                                <input
                        type="number"
                        value=""
                        style={{width:"40%"}}
                        />
                    <Button style={{background: "#894fa2", border:"none"}} >Change</Button>
                        </div>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col  md={6} className='dash-col'>
                        <Card className='dash-card'>
                            <Card.Body className='d-flex flex-column justify-content-between'>
                                <Card.Title style={{    color: "#5e005e",fontWeight: "bold"}}>Max Incentive</Card.Title>
                                <Card.Text>{currentMaxIncentive} 🪙 on each order</Card.Text>
                                <div className='d-flex justify-content-between' style={{margin:"4px 0"}}>

                                <input
                        type="number"
                        value=""
                        style={{width:"40%"}}
                        />
                    <Button style={{background: "#894fa2", border:"none"}} >Change</Button>
                        </div>
                                
                            </Card.Body>
                        </Card>
                    </Col>

               
            </Row>
        </div>


        <Modal show={showModal} onHide={handleCloseModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title style={{alignText:"center", width:"100%"}}>Credit Tokens</Modal.Title>
                </Modal.Header>
                <Modal.Body className='d-flex flex-column align-items-center justify-content-center'>
                <span style={{fontSize:"80px"}} className='rotate-text'>🪙</span>
                <Button style={{background: "#894fa2", border:"none", margin:"5px 0", width:"10rem"}} onClick={handleCreditToken}>Credit Token</Button>
               
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
            
          </Col>
        
    )
}

export default Dashboard;