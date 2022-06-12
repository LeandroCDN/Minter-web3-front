import { useState } from "react";
import "./CurrencyToken.css";
import { ethers, bigNumber } from "ethers";
import  currency  from "../contracts/token/currency/currency.json";

const currencyAddress = "0xF9b0920B4C8cC2228bF0C54503307a229cE992A9";
const gameLogicAddress = "0x6a11F44Ed82f8eCA8BE141e08676Aa02471Aa134";

const CurrencyToken = ({ accounts, setAccounts, setAllowance }) => {
  const [balance, setBalance] = useState(0);  
  const isConected = Boolean(accounts[0]);

  const getAllowance = async () => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(currencyAddress, currency.abi, signer);
      try {
        const allowance = await contract.allowance(accounts[0], gameLogicAddress);        
        setAllowance(ethers.utils.formatEther(allowance.toString()));
      } catch (err) {
        console.log(err);
      }

    }
  }
  getAllowance();
  async function getBalance() {
    if (window.ethereum){
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(currencyAddress, currency.abi, signer);
      try {
        const balances = await contract.balanceOf(accounts[0]);
        setBalance(ethers.utils.formatEther(balances.toString()));
      } catch (err) {
        console.log(err);
      }
    };
  }



  return (
    <form className='formGlass formGlass-conected'>
      <h2 className="hConected"> Token Balance</h2>
      <p className="forget"> This tokens help you to mint Nfts</p>
      {isConected
      ? ( <button type="button" onClick={getBalance} className="Button-Conected Button">Get Balance</button> )
      : ( <p> Your must be conected to interact this dApp</p> )
      }
      <p className="forget"> Your balance: {balance} CryTokens</p> 
    </form>
  );
}
export { CurrencyToken };