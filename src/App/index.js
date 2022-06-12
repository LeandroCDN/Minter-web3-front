import { useState } from 'react';
import './App.css';
import { CurrencyToken } from '../CurrencyToken';
import { NavBar } from '../NavBar';
import { Minter } from '../Minter';

function App() {
  const [accounts, setAccounts] = useState([]);
  const [allowance, setAllowance] = useState(0);
  

  return (
    <section>      
      <div className="color"> </div>
      <div className="color"> </div>
      <div className="color"> </div>
      <div className="App">             
        <div className='boxGlass'>
          <div className='boxGlass square s1'></div>
          <div className='boxGlass square s2'></div>
          <div className='boxGlass square s3'></div>
        </div>
          {accounts.length === 0  
          ? (  <NavBar accounts={accounts} setAccounts={setAccounts} />  )
          : ( <>
              <NavBar accounts={accounts} setAccounts={setAccounts} />
              <div className='boxGlass boxConect'>
                <div className='boxGlass square s5'></div>
                <div className='boxGlass square s6'></div>      
                <div className='containerGlass conected'>
                    <CurrencyToken 
                        accounts={accounts} 
                        setAccounts={setAccounts} 
                        setAllowance={setAllowance}
                        
                        />
                    <Minter accounts={accounts} setAccounts={setAccounts}  allowance={allowance}/>
                    
                  </div>
              </div>
            </> 
          )  
          }                        
        
      </div>
    </section>
  );
}

export default App;



{/* <CurrencyToken 
                accounts={accounts} 
                setAccounts={setAccounts} 
                setAllowance={setAllowance}
                
              />

            <Minter accounts={accounts} setAccounts={setAccounts}  allowance={allowance}/>  */}