import React, { useEffect,useState } from 'react';
import { getTransaction } from '../../walletUtil';
import PartnerModal from './PartnerModal';
import { HiUser } from "react-icons/hi";
import { getPartnerTransaction, load } from '../../walletUtil';

const PartnerDetail = ({ customer}) => {
    const [purchaseHistory, setPurchaseHistory]=useState([]);
    const [balance,setBalance] = useState(0);
    const [granted,setGranted] = useState(0)
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
        // getPartnerTransaction(customer.wallet).then(data=>console.log(data))
        load(customer.wallet).then(data=>setBalance(data));
        let sum = 0;
        getPartnerTransaction(customer.wallet).then(data=>{
              const formattedData = data.map(innerArray => {
                sum += Number(innerArray.amount)
                return {
                    amount: Number(innerArray.amount),
                    time: Number(innerArray.timestamp),
                };
              })
              setPurchaseHistory(formattedData.reverse());
              setGranted(sum);
            })
    },[customer.wallet])

        return (
    <div>
      <div>
            <div onClick={() => openModal()}>
                <div className='d-flex justify-content-between'>
            
                <h3><HiUser style={{margin:"0 5px"}}/>{customer.name}</h3>
                <p>{customer.id}</p>
                </div>
                <p style={{    fontSize: "11px", color: "#727272",
    margin: "0px 40px"}}>{customer.wallet}</p>
                </div>
            
            <PartnerModal
                show={modalShow}
                handleClose={closeModal}
                customerData={purchaseHistory} 
                balance = {balance}
                granted = {granted}
                address = {customer.wallet}
            width="large"
            />
        </div>
     
    </div>
  );
};

export default PartnerDetail;
