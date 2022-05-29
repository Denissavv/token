import React, { useState } from "react";
import { Principal } from "@dfinity/principal";
import { token } from "../../../declarations/token";

function Balance() {
 const [inputValue, setInputValue] = useState("");
 const [balanceValue, setBalanceValue] = useState("");
 const [symbolValue, setSymbolValue] = useState("");
 const [hidden, setHidden] = useState(false);

 const handleChange = data => {
  setInputValue(data.target.value);
 };

 async function handleClick() {
  const principal = Principal.fromText(inputValue);
  const symbol = await token.getSymbol();
  const balance = await token.balanceOf(principal);

  console.log(balance)
  setHidden(true);

  setSymbolValue(symbol);

  setBalanceValue(balance.toLocaleString());
 }

 return (
  <div className='window white'>
   <label> Check account token balance: </label>
   <p>
    <input
     id='balance-principal-id'
     type='text'
     placeholder='Enter a Principal ID'
     value={inputValue}
     onChange={handleChange}
    />
   </p>
   <p className='trade-buttons'>
    <button id='btn-request-balance' onClick={handleClick}>
     Check Balance
    </button>
   </p>
   {hidden ? (
    <p>
     This account has a balance of {balanceValue} {symbolValue}.
    </p>
   ) : null}
  </div>
 );
}

export default Balance;
