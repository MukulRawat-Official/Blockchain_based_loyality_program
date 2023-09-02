import React, {useEffect, useState} from 'react';
import { ListGroup } from 'react-bootstrap';
import { fetchProducts } from '../api';

function RewardHistoryItem({ reward }) {
    const [product,setProduct] = useState({});
    useEffect(() => {
        fetchProducts().then(data => {
          const p = data.find(prod => {
            if(reward.product)
            return prod.id === Number(reward.product.product)
            else return null
          });
        //   console.log(reward)
          if(p) setProduct(p);
          

          
        });
      
      }, []);

      function formatTimestamp(timestamp) {
        const date = new Date(timestamp);
        const day = date.getDate();
        const month = date.getMonth() + 1; // Months are zero-based
        const year = date.getFullYear();
        
        const formattedDate = `${day}-${month}-${year}`;
        return formattedDate;
    }
    return (
        <ListGroup.Item>
            <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                    <img
                        src={product.image} // Replace with the actual image source
                        alt={product.title}
                        style={{ width: '50px', height: '50px', marginRight: '10px' }}
                    />
                    <div>
                        <h6>{product.title}</h6>
                        {/* <p>Order Id: {reward.id}</p> */}
                        <p>Rs. {product.price}</p>
                    </div>
                </div>
                <div className='d-flex flex-column align-items-center'>
                    <p>{reward.status===3 &&(<span style={{color:'red'}}>- {reward.rate}🪙</span>)} {reward.status===2 && (<span style={{color:'green'}}>+ {reward.rate}🪙</span>)} {reward.status===1 && (<span style={{color:'green'}}>cancelled</span>)}</p>
                    {reward.status===2 && (<p>To be Credit on : {formatTimestamp(reward.time)}</p>)}
                    {reward.status===0 && (<p>Credited</p>)}
                    {reward.status===3 && (<p>Dedited on: {formatTimestamp(reward.time*1000)} </p>)}
                    {/* <p>{reward.status===?(<span style={{color:'red'}}>- {reward.rate}</span>):(<span style={{color:'green'}}>+ {reward.rate}</span>)} 🪙</p> */}
                </div>
            </div>
        </ListGroup.Item>
    );
}

export default RewardHistoryItem;
