import React, { useState } from "react";
import { token, createActor, canisterId } from "../../../declarations/token";
import { AuthClient } from "@dfinity/auth-client";

function Faucet(props) {
 const [isDisabled, setIsDisabled] = useState(false);
 const [buttonText, setText] = useState("Gimmy Gimmy");

 async function handleClick(event) {

  const authClient = await AuthClient.create();
  const identity = await authClient.getIdentity();

  const authenticationCanister = createActor(canisterId, {
   agentOptions: {
    identity,
   },
  });

  setIsDisabled(true);
  const result = await authenticationCanister.payOut();
  setText(result);
 }

 return (
  <div className='blue window'>
   <h2>
    <span role='img' aria-label='tap emoji'>
     🚰
    </span>
    Faucet
   </h2>
   <label>
    Get your free DAngela tokens here! Claim 10,000 DAK coins to your {props.userPrincipal}.
   </label>
   <p className='trade-buttons'>
    <button
     disabled={isDisabled ? true : false}
     id='btn-payout'
     onClick={handleClick}
    >
     {buttonText}
    </button>
   </p>
  </div>
 );
}

export default Faucet;
