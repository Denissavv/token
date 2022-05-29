import React, { useEffect, useState } from "react";
import { Principal } from "@dfinity/principal";
import { createActor, canisterId } from "../../../declarations/token";
import { AuthClient } from "@dfinity/auth-client";

function Transfer() {
 const [toAccount, setToAccount] = useState("");
 const [amountValue, setAmountValue] = useState("");
 const [isDisabled, setIsDisabled] = useState(false);
 const [statusVisible, setStatusVisible] = useState(false);
 const [statusValue, setStatusValue] = useState("");

 async function handleClick() {
  const principalId = Principal.fromText(toAccount);
  const converIntoNumber = Number(amountValue);
  setIsDisabled(true);

  const authClient = AuthClient.create();
  const identity = authClient.getIdentity();

  const authenticationCanister = createActor(canisterId, {
   agentOptions: {
    identity,
   },
  });

  const response = await authenticationCanister.transfer(
   principalId,
   converIntoNumber
  );

  setStatusValue(response);
  setIsDisabled(false);
  setStatusVisible(true);
  return response;
 }

 return (
  <div className='window white'>
   <div className='transfer'>
    <fieldset>
     <legend>To Account:</legend>
     <ul>
      <li>
       <input
        type='text'
        id='transfer-to-id'
        value={toAccount}
        onChange={e => setToAccount(e.target.value)}
       />
      </li>
     </ul>
    </fieldset>
    <fieldset>
     <legend>Amount:</legend>
     <ul>
      <li>
       <input
        type='number'
        id='amount'
        value={amountValue}
        onChange={e => setAmountValue(e.target.value)}
       />
      </li>
     </ul>
    </fieldset>
    <p className='trade-buttons'>
     <button
      disabled={isDisabled ? true : false}
      id='btn-transfer'
      onClick={handleClick}
     >
      Transfer
     </button>
    </p>
    {statusVisible ? <p>{statusValue}</p> : null}
   </div>
  </div>
 );
}

export default Transfer;
