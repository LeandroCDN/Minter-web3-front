import React from 'react';
import { ethers } from "ethers";

const networks = {
  matic: {
    chainId: `0x${Number(137).toString(16)}`,
    chainName: "Polygon Mainnet",
    nativeCurrency: {
      name: "Matic",
      symbol: "MATIC",
      decimals: 18,
    },
    rpcUrls: ["https://polygon-rpc.com/"],
    blockExplorerUrls: ["https://mumbai.polygonscan.com/"],
  },
  mumbai:{
    chainId: `0x${Number(80001).toString(16)}`,
    chainName: "Mumbai",
    nativeCurrency: {
      name: "Matic",
      symbol: "MATIC",
      decimals: 18,
    },
    rpcUrls: ["https://rpc-mumbai.matic.today"],
    blockExplorerUrls: ["https://mumbai.polygonscan.com/"],
  }
}
const changeNetwork = async ({networkName, setError}) => {
  try {
    if(!window.ethereum) throw new Error("No Ethereum browser detected");
    await window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: [
        {...networks[networkName]}
      ]
    });
  }catch (err) {
    setError(err.message);  
  }
}


const NavBar = ({ accounts, setAccounts }) => {
  const [error, setError] = React.useState();
  const isConected = Boolean(accounts[0]);



  const handleNetworkSwitch = async (networkName) => {
    setError();
    await changeNetwork({ networkName, setError });
  };

  const networkChanged = (chainId) => {
    console.log({ chainId });
    if(!(chainId === 80001)){
      handleNetworkSwitch("mumbai");
    }
  };

  React.useEffect(() => {
    window.ethereum.on("chainChanged", networkChanged);

    return () => {
      window.ethereum.removeListener("chainChanged", networkChanged);
    };
  }, []);

  async function connectAccount() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const network = await provider.getNetwork();
    const  chainId  = network.chainId;
    if(window.ethereum){
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      });
      setAccounts(accounts);
      if(!(chainId === 80001)){
        handleNetworkSwitch("mumbai");
      }
    }
  }
  
  
  return(
    <div>
      {/* left side - social media icons */}
      <div> Twitter</div>
      <div> Github</div>
      <div> LinkedIn</div>

      <div>About</div>
      <div>Contact</div>

      {/*conect*/}
      {isConected
      ? ( <p>Conected</p> )
      : ( <button onClick ={connectAccount}>Connect!</button> )
      } 
    </div>
  )
}

export { NavBar };