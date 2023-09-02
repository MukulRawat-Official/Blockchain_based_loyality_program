import React, {useEffect, useState} from 'react';
import {Container, Button, ListGroup} from 'react-bootstrap';
import { connectedAddress, load, getPartnerCustomerTransaction, payLoyalty } from '../../walletUtil';
import { MdAccountBalanceWallet } from "react-icons/md";
import './interface.css'

    function Dashboard({ title }) {
        const [transactions,setTransactions] = useState([]);
        const [balance, setBalance] = useState(0);
        const [address, setAddress] = useState("");
        const [token,setToken] = useState(0);
        const [account,setAccount] = useState("");
        const sectionStyle = {
        minHeight: "100vh",
        // display: "flex",
        // flexDirection: "column",
        // alignItems: "center",
        // justifyContent: "center",
        background:"rgb(237 237 237)"
       }

       useEffect(()=>{
        connectedAddress().then(data=>setAddress(data));
        if(address.length>0) load(address).then(data=>setBalance(data));
        if(address.length>0) getPartnerCustomerTransaction(address).then(data=>{
            console.log(data)
            const formattedData = data.map(innerArray => {
                return {
                    customerAddress : String(innerArray.customerAddress),
                    amount: Number(innerArray.amount),
                    time: Number(innerArray.timestamp),
                };
              })

              setTransactions(formattedData);
        })
        
       },[address])

       function formatDateAndTime(timestamp) {
        const date = new Date(timestamp*1000);
    
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
    
        return `${day}-${month}-${year} ${hours}h-${minutes}m-${seconds}s`;
    }
    const handlePay = () =>{
        if(token>0 && account.length>0 && address.length>0) payLoyalty(address,account,Number(token))
    }
    return (
        
        <div id="dashboard" className="section" style={sectionStyle}>
            <div className='d-flex flex-row align-items-center justify-content-evenly' style={{height:"100vh", width:"98vw"}}>
                <div style={{height:"70vh", width:"30%"}} className='d-flex flex-column justify-content-around' >

                <div className='partner-i-card'>
                    <p style={{fontSize:"15px"}}><MdAccountBalanceWallet size="30px"/> {address}</p>
                    <p className='txt'>Balance : {balance}🪙</p>

                </div>
                <div className='partner-i-card'>
                    <p className='txt'>Reward Loyal Customers </p>
                    <div className='d-flex flex-row justify-content-between'>

                <input
                        type="number"
                       onChange={(e)=>setToken(e.target.value)}
                       placeholder='Enter Tokens'
                        style={{width:"45%"}}
                        />
                <input
                        type="text"
                       onChange={(e)=>setAccount(e.target.value)}
                       placeholder='Enter Account Address'
                        style={{width:"45%"}}
                        />
                        </div>
                    <Button style={{background: "#894fa2", border:"none", width:"40%"}} onClick={handlePay} >Pay</Button>

                </div>
                </div>
                <div style={{height:"70vh", width:"50%"}}>
                <span style={{fontSize: "20px",
    color: "#491449",
    fontWeight: "bold"}}>Transactions</span>
            <ListGroup variant="flush">
            {transactions.map((trans, index) => (
                <ListGroup.Item key={index} style={{ margin:"10px 0"}} className='d-flex flex-row justify-content-between align-items-center'>
                   <div className='d-flex flex-column'>
                    <span>{trans.customerAddress}</span>
                  <span style={{fontSize:"12px"}}>Granted on : {formatDateAndTime(trans.time)}</span>

                   </div>
                  <span style={{color:"green", fontWeight:"bold", fontSize:"20px"}}>{trans.amount} 🪙</span>
          </ListGroup.Item>
        )
        )}
              </ListGroup>
        </div>
            </div>
        </div>
    );
}

export default Dashboard;

