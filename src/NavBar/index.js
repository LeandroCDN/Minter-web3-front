import React from 'react';
import { ethers } from "ethers";
import './NavBar.css'

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


const NavBar = ({ accounts, setAccounts, setConected }) => {
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
    <>
      <ul className="navUl">
        <li className="navLi"><a href='https://twitter.com/Patoverde_' target="_blank"><p>Twitter</p></a></li>
        <li className="navLi"><a  href='https://github.com/LeandroCDN' target="_blank"><p>Github</p></a></li>
        <li className="navLi"><a  href='https://www.linkedin.com/in/leandro-ariel-labiano-ramo/' target="_blank"><p>LinkeDin</p></a></li>
      </ul> 

      <ul className="navUl-left">
        <li className="navLi-Abaut"><a href='#'><p>About</p></a></li>
      </ul>    
      
      {isConected
      ? ( 
        <ul className="navUl-center">
          <li className="navLi-center">
            <a className="a-Conect">
              <p>Conected</p> 
            </a>         
          </li>
        </ul> 
      )
      : (
        <div className='boxGlass'>
          <div className='boxGlass square s4'></div>          
          <div className='containerGlass'>
            <form className='formGlass'>
              <h2 className="hConect"> CONECT YOUR WALLET</h2>
              <button onClick ={connectAccount} className="Button-nav Button">Connect</button>
              <p className="forget">Need help to conect? <a href="https://metamask.io/" target=" _blank">Click Here</a></p>
            </form>
          </div>
          
        </div>
        )
      } 
    </>
  )
}

export { NavBar };