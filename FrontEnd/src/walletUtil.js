import Web3 from 'web3';
import contract_abi from './contract_abi1.json'

// const contractAddress = "0xD0412b8FbB7BbCE7541b2626401373FcC4DCf248"
// const contractAddress = "0xEb1EC4b9FF6A138C26154f1448209f93160E3179"
// const contractAddress = "0x7e35Ce0287E32b8e07dC89E16d4E1bf5b13aF363"
// const contractAddress = "0xED111B3f85D604E14fDCFa6BAb125eE0A2C9e7E0"
const contractAddress = "0xDBC14e54998231fE7Bd856F9F1daeF6FDd5e1fE2"
export const connectWallet = async () => {
  if (window.ethereum) {
    try {
      await window.ethereum.enable();
      const web3 = new Web3(window.ethereum);
      const accounts = await web3.eth.getAccounts();
      const connectedAccount = accounts[0];
      // window.location.reload();
      return connectedAccount;
    } catch (error) {
      console.error('Error connecting to MetaMask:', error);
    }
  } else {
    console.error('MetaMask not detected.');
  }
  return null;
};

export const connectedAddress = async() =>{
      const web3 = new Web3(window.ethereum);
      const accounts = await web3.eth.getAccounts();
      if (accounts.length > 0) {
        const connectedAccount = accounts[0];
        return connectedAccount;
    } else {
        return null;
    }
}

export const ownerAddress = async() =>{
  const web3 = new Web3(window.ethereum);
        const contract = new web3.eth.Contract(contract_abi, contractAddress)
        if (contract) {
          const address = await contract.methods.owner().call();
          return address;
        }
        else{
          return null;
        }
}

export const addTransaction = async(account,id,amount,timestamp) =>{
  const web3 = new Web3(window.ethereum);
        const contract = new web3.eth.Contract(contract_abi, contractAddress)
        if (contract) {
          const response = await contract.methods.addTransaction(account,id,amount,timestamp).send({from : account, gas : 300000});
          return response;
        }
        else{
          return null;
        }
}



export const load = async (account) => {
        const web3 = new Web3(window.ethereum);
        const contract = new web3.eth.Contract(contract_abi, contractAddress)
        if (contract) {
          const balance = await contract.methods.balanceOf(account).call();
        //   const tobemint = await contract.methods.toBeMint().call();
          const ethval = web3.utils.fromWei(balance, 'ether')
          return ethval;
        }
        else{
          return null;
        }
      }
  
export const getTransaction = async (account) => {
        const web3 = new Web3(window.ethereum);
        const contract = new web3.eth.Contract(contract_abi, contractAddress)
        if (contract) {
            const trans = await contract.methods.getTransaction(account).call();

          return trans;
        }
        else{
          return null;
        }
      }

export const pay= async (from,to,id,amount) => {
        const web3 = new Web3(window.ethereum);
        const contract = new web3.eth.Contract(contract_abi, contractAddress)
        if (contract) {
            const trans = await contract.methods.debitToken(to,id,amount).send({from : from});

          return trans;
        }
        else{
          return null;
        }
      }

      export const cancelOrder= async (from,id) => {
        const web3 = new Web3(window.ethereum);
        const contract = new web3.eth.Contract(contract_abi, contractAddress)
        if (contract) {
            const trans = await contract.methods.cancelTransaction(from,id,).send({from : from});

          return trans;
        }
        else{
          return null;
        }
      }


      export const customerCount= async () => {
        const web3 = new Web3(window.ethereum);
        const contract = new web3.eth.Contract(contract_abi, contractAddress)
        if (contract) {
            const total = await contract.methods.getTotalCustomerCount().call();

          return total;
        }
        else{
          return null;
        }
      }

      export const customers= async () => {
        const web3 = new Web3(window.ethereum);
        const contract = new web3.eth.Contract(contract_abi, contractAddress)
        const customerData = [];
        const indexes = await contract.methods.getTotalCustomerCount().call();
        for (let index=0;index<parseInt(indexes);index++) {
            try {
                const total = await contract.methods.customers(index).call();
                customerData.push(total);
            } catch (error) {
                console.error(`Error retrieving data for index ${index}:`, error);
            }
        }
    
        return customerData;
      }

      export const getToBeMint= async () => {
        const web3 = new Web3(window.ethereum);
        const contract = new web3.eth.Contract(contract_abi, contractAddress)
        if (contract) {
            const total = await contract.methods.toBeMint().call();
            
            const ethval = web3.utils.fromWei(total, 'ether')
          return ethval;
        }
        else{
          return null;
        }
      }

      export const getIncentive= async () => {
        const web3 = new Web3(window.ethereum);
        const contract = new web3.eth.Contract(contract_abi, contractAddress)
        if (contract) {
            const total = await contract.methods.getIncentive().call();
          
          return total;
        }
        else{
          return null;
        }
      }
      
      export const getMaxIncentive = async () => {
        const web3 = new Web3(window.ethereum);
        const contract = new web3.eth.Contract(contract_abi, contractAddress)
        if (contract) {
            const total = await contract.methods.getMaxIncentive().call();
          
          return total;
        }
        else{
          return null;
        }
      }

      export const mintCoin = async (coin) => {
        const web3 = new Web3(window.ethereum);
        const contract = new web3.eth.Contract(contract_abi, contractAddress)
        if (contract) {
            const total = await contract.methods.mintCoin(coin).send({from:"0xb764C0B208D08F8A397991d995883a4aae95518f"});
          
          return total;
        }
        else{
          return null;
        }
      }
      export const addPartner = async (address) => {
        const web3 = new Web3(window.ethereum);
        const contract = new web3.eth.Contract(contract_abi, contractAddress)
        if (contract) {
            const total = await contract.methods.addPartner(address).send({from:"0xb764C0B208D08F8A397991d995883a4aae95518f"});
          
          return total;
        }
        else{
          return null;
        }
      }


      export const crediToken = async () => {
        const web3 = new Web3(window.ethereum);
        const contract = new web3.eth.Contract(contract_abi, contractAddress)
        if (contract) {
            const total = await contract.methods.creditTokens().send({from:"0xb764C0B208D08F8A397991d995883a4aae95518f"});
          
          return total;
        }
        else{
          return null;
        }
      }
      export const grantTokens = async (acc,amount) => {
        const web3 = new Web3(window.ethereum);
        const contract = new web3.eth.Contract(contract_abi, contractAddress)
        if (contract) {
            const total = await contract.methods.grantTokens(acc, amount).send({from:"0xb764C0B208D08F8A397991d995883a4aae95518f"});
          
          return total;
        }
        else{
          return null;
        }
      }

      export const getPartnerTransaction = async (acc) => {
        const web3 = new Web3(window.ethereum);
        const contract = new web3.eth.Contract(contract_abi, contractAddress)
        if (contract) {
            const total = await contract.methods.getPartnerTransaction(acc).call();
          
          return total;
        }
        else{
          return null;
        }
      }
      export const getPartnerCustomerTransaction = async (acc) => {
        const web3 = new Web3(window.ethereum);
        const contract = new web3.eth.Contract(contract_abi, contractAddress)
        if (contract) {
            const total = await contract.methods.getPartnerCustomerTransaction(acc).call();
          
          return total;
        }
        else{
          return null;
        }
      }
      
      export const payLoyalty = async(from,to, amount) =>{
        const web3 = new Web3(window.ethereum);
        const contract = new web3.eth.Contract(contract_abi, contractAddress)
        if (contract) {
            const total = await contract.methods.payLoyalty(to,amount).send({from:"0x219c6c7EAf0333D99D54E9dF017Ce321AC5B6073", gas:300000});
          
          return total;
        }
        else{
          return null;
        }

      }
      

    