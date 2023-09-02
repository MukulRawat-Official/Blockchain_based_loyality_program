import React, { useEffect,useState } from 'react';
import { getTransaction } from '../../walletUtil';
import CustomerModal from './Modal';
import { HiUser } from "react-icons/hi";
import { Button } from 'react-bootstrap';

const CustomerDetails = ({ customer}) => {
    const [purchaseHistory, setPurchaseHistory]=useState([]);
    const [modalShow, setModalShow] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState(null);

    const openModal = (customer) => {
        setSelectedCustomer(customer);
        setModalShow(true);
    };

    const closeModal = () => {
        setSelectedCustomer(null);
        setModalShow(false);
    };

    useEffect(()=>{
        let acc = customer;
        const orderData = JSON.parse(localStorage.getItem('orders'));
        getTransaction(acc).then(data=>{
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
              setPurchaseHistory(formattedData.reverse());
            })
        },[customer])
        return (
    <div>
      <div>
            <div onClick={() => openModal()}>
                <div className='d-flex justify-content-between'>
            
                <h3><HiUser style={{margin:"0 5px"}}/>{localStorage.getItem('name')}</h3>
                <p>{localStorage.getItem('id')}</p>
                </div>
                <p style={{    fontSize: "11px", color: "#727272",
    margin: "0px 40px"}}>{localStorage.getItem('wallet')}</p>
                </div>
            
            <CustomerModal
                show={modalShow}
                handleClose={closeModal}
                customerData={purchaseHistory} 
            width="large"
            />
        </div>
     
    </div>
  );
};

export default CustomerDetails;
