import React, {useState, useEffect} from 'react';
import { Container, Card, ListGroup, Row, Col ,Button} from 'react-bootstrap';
import HistoryItem from './history';
import './test.css'
import profileImage from '../assests/profile_avatar.png';
import {load, getTransaction} from '../walletUtil'
import OrderHistory from './OrderHistory';
import { MdAccountBalanceWallet } from "react-icons/md";

const Profile = () => {
  // Sample order history data
  const [orders,setOrders] = useState([ ]);
  const [reward,setReward] = useState(0);
  const [wallet, setWallet] = useState('')
  const [name, setName] = useState('');
  const [rewardHistory, setRewardHistory] = useState([]);

  useEffect(()=>{
    setName(localStorage.getItem('name'))
    setWallet(localStorage.getItem('wallet'));
    const orderData = JSON.parse(localStorage.getItem('orders'));
    setOrders(orderData.reverse());

    const acc = localStorage.getItem("wallet");
    load(acc).then(data=>setReward(data));


    

    

    getTransaction(acc).then(data=>
      {
     
        const formattedData = data.map(innerArray => {
          const innerArrayId = Number(innerArray.id);
          const matchedOrder = orderData.find(order => order.id === innerArrayId);
      
      
          return {
              id: innerArrayId,
              product: matchedOrder,
              rate: Number(innerArray.amount),
              time: Number(innerArray.time),
              status: Number(innerArray.status)
          };
        })
        setRewardHistory(formattedData.reverse())
        
        

      }
      );
  },[])




  return (
    <Container className="mt-4">
      <Row>
        <Col md={4}>
        <Card className='d-flex align-items-center ' style={{maxWidth:"470px", padding:"20px 0"}}>
              <img src={profileImage} style={{width:'15rem', height:'14rem', borderRadius:"50%"}} alt="Profile" />
            <Card.Body className="d-flex flex-column align-items-center">
              <h4>👋{name}</h4>
              {
                wallet.length>0? (
                  <div className='d-flex flex-column align-items-center my-6' style={{margin:'6px 0'}}>
                    <p style={{fontWeight:"bold"}}>Total Rewards Earned {reward}🪙</p>
                
                    <p style={{fontSize:"12px"}}><MdAccountBalanceWallet size={30}/>  {wallet}</p>
                  </div>
                ):(
                  <p>Not Connected</p>
                )
              }
              
              <Button style={{background: "#894fa2", border:"none",margin:"10px 0"}}>Log out</Button>
            
            </Card.Body>
          </Card>
        </Col>
        <Col md={8}>
        
          <Card className="">
            <Card.Body>
              <h4>Order History</h4>
              <ListGroup variant="flush" className="order-history-scroll">
                {orders.map((order,index) => (
                  <OrderHistory key={index} order={order}/>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
          </Col>
          </Row>
          <Card className="my-4">
            <Card.Body>
              <h4>🪙 Reward History</h4>
              <ListGroup variant="flush" className="order-history-scroll">
                {rewardHistory.map((reward,key) => (
                 <HistoryItem key={key} reward={reward} />
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
    </Container>
  );
};

export default Profile;
