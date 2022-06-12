import { useState } from 'react';
import { ethers, bigNumber } from "ethers";
import  ohMyMinter  from "../contracts/ohMyMinter.sol/ohMyMinter.json";
import  GameLogic  from "../contracts/GameLogic/GameLogic.json";
import  currency  from "../contracts/token/currency/currency.json";
import "./Minter.css";

const nftAddress = "0xa0e1b73c36A4aB123FAebbbFeeb7CDAaafbb6Bb4";
const gameLogicAddress = "0x6a11F44Ed82f8eCA8BE141e08676Aa02471Aa134";
const currencyAddress = "0xF9b0920B4C8cC2228bF0C54503307a229cE992A9";

const Minter = ({ accounts, setAccounts, allowance }) => {
  const [price, setPrice] = useState(0);
  // console.log(allowance);
  const [isAllowance, setIsAllowance] = useState(allowance>0);
  const isConected = Boolean(accounts[0]);

  isConected && getCurrentPrice();
  //  setIsAllowance(allowance>0);
  

  async function getCurrentPrice() {
    if (window.ethereum){
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(gameLogicAddress, GameLogic.abi, signer);
      try {
        // console.log
        const prices = await contract.getCurrentPrice();
        setPrice(ethers.utils.formatEther(prices.toString()));
      } catch (err) {
        console.log(err);
      }
    };
   
  }

  async function mintNft() {
    if (window.ethereum){
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contractGameLogic = new ethers.Contract(gameLogicAddress, GameLogic.abi, signer);      
      try {
        const response = await contractGameLogic.buy();
        // console.log("Response ow approve: " + response)
        
      } catch (err) {
        console.log(err);
      }
    }
  }

  async function approve(){
    if (window.ethereum){
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contractGameLogic = new ethers.Contract(gameLogicAddress, GameLogic.abi, signer);
      const contractCurrency = new ethers.Contract(currencyAddress, currency.abi, signer);
      try{
        const approve = await contractCurrency
          .approve(contractGameLogic.address, ethers.utils.parseEther("1000000000000000000"))
          .then(() => setIsAllowance(true));        
      }catch (err) {
        console.log(err);
      }
    }
  }

  return (
    <form className='formGlass'>
      <h2 className="hmint"> Mint a nft! </h2>
      <div className='divPrice'>
        <p className="forget"> This tokens help you to mint Nfts</p>
        { isConected
          ? ( <button type="button" onClick={getCurrentPrice} className="Button-nav Button Button-Conected">Update Price</button> )
          : ( <p className="forget"> You must be conected to interact this dApp</p> )
        }
        <p className="forget"> Price: {price} </p>, 
      </div>
        <div>
          {allowance > 0 || isAllowance
            ? ( <button  type="button" onClick={mintNft} className="Button-nav Button">Mint Nft</button> )
            : ( <button type="button" onClick={approve} className="Button-nav Button">Approve</button>  )
          }        
        </div>
    </form>
  );


}

export { Minter };