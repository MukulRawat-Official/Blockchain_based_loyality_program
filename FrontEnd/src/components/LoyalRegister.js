import React, { useState } from 'react';
import Web3 from 'web3'
import { Container, Card, Button } from 'react-bootstrap';
import profileAvatar from '../assests/profile_avatar.png';
import {connectWallet, load} from '../walletUtil';

const LoyalRegister = () => {
    const [connected, setConnected] = useState(false);
    const [account, setAccount] = useState('');
    const handleConnect = ()=>{
        const response = connectWallet();
        if(response) {
            response.then(data=>{
                setAccount(data)
                setConnected(true)
                load(data).then(res=>console.log(res));
             });

        }
        else alert("Not connected");
    }

    const register = (_account) => {

        const id = localStorage.getItem("id");
        fetch('http://127.0.0.1:3001/loyalregister', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                _id: id,
                walletAddress: _account
            })
        }).then(response => {
            if (response.status === 200) {
                alert("updated")
            }
            else alert('not registered')
        })
    }


    return (
        <Container className="d-flex justify-content-center align-items-center vh-100">
            <Card className="text-center p-4" style={{ width: '18rem', boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.2)' }}>
                <Card.Img src={profileAvatar} alt="Profile" style={{ width: '6rem', height: '6rem', borderRadius: '50%' }} />
                <Card.Body>
                    <Card.Title>Create Your Account</Card.Title>
                    <Card.Text>Sign up to start using our platform</Card.Text>
                    {!connected ? (
                        <Button variant="primary" className="w-100 mb-3" onClick={handleConnect}>
                            Connect to MetaMask
                        </Button>
                    ) : null}
                    <Button variant="light" className="w-100">Skip</Button>
                </Card.Body>
            </Card>
            {connected && (
                <Card className="text-center p-4" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: '#f5f5f5', borderRadius: '15px' }}>
                    <Card.Title>Connected!</Card.Title>
                    <Card.Text>You are now connected to MetaMask.</Card.Text>
                    <Card.Text>{account}</Card.Text>
                    {/* Add any additional content for the connected state */}
                </Card>
            )}
        </Container>
    );
};

export default LoyalRegister;
