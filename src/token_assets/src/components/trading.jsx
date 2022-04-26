import React, { useState } from "react";
import { Principal } from "@dfinity/principal";
import { token, canisterId, createActor } from "../../../declarations/token"
import { AuthClient } from "@dfinity/auth-client";


export default function Trading(props) {


    const [inputValue, setInput] = useState(props.iid);
    const [balanceResult, setBalance] = useState("")
    const [isDisabled, setDisabled] = useState(false)
    const [isTransferDisabled, setTDisabled] = useState(false)
    const [buttonText, setText] = useState("Claim")
    const [recipientId, setId] = useState("")
    const [amount, setAmount] = useState("")
    const [transferResult, setTransferResult] = useState("Transfer")
    const [callerID, setCaller] = useState("")

    async function handleBalance() {
        console.log(inputValue)
        const principal = Principal.fromText(inputValue);
        const balance = await token.balanceOf(principal);
        setBalance(balance.toLocaleString());
    }

    async function handleClaim(event) {
        setDisabled(true);

        // USE INTERNET IDENTITY WHEN DEPLOYED TO IC

        // const authClient = await AuthClient.create();
        // const identity = await authClient.getIdentity();
        
        // const authenticatedCanister = createActor(canisterId, {
        //     agentOptions: {
        //         identity, 
        //     },
        // });

        // const result = await authenticatedCanister.payOut();
        
        // FOR LOCAL DEV USE
        const result = await token.payOut();
        setText(result);
    }

    async function handleTransfer() {
        setTDisabled(true)
        const recipient = Principal.fromText(recipientId);
        const amountToTransfer = Number(amount);
        const result = await token.transfer(recipient, amountToTransfer);
        setTransferResult(result)
        setTDisabled(false)
    }

    return (
        <div className="magic-card">
            <div className="magic-card-top">

                
                    <div className="logo-size-container-trading">
                        <div className="token-logo">
                            <div className="token-logo-top">
                                <img src="./images/logo.png" alt="token-logo"></img>
                                
                            </div>
                        </div>
                    </div>

                    <div className="wallet-container">
                        <div>
                            <h3>Total Balance</h3>
                            <div className="wallet">
                                <button 
                                    id="btn-reload"
                                    onClick={handleBalance}
                                >
                                    <i className="fa-solid fa-rotate"></i>
                                </button>
                                <h2>{balanceResult}</h2>
                                <p>CTNO</p>
                            </div>
                        </div>
                        <div className="check-balance-div">

                            <div className="id-form">
                                <p>Check Balance</p>
                                <form>
                                    <input 
                                        type="text" 
                                        // FOR IC DEPLOY
                                        // value={inputValue}

                                        // FOR LOCAL DEPLOY
                                        value={inputValue}
                                        onChange={(e) => setInput(e.target.value)}
                                    ></input>
                                </form>
                            </div>
                            
                        </div>
                        
                    </div>

                    <div className="transers-container">
                        <h3>Transfers</h3>
                        <form className="transer-form">
                            <div>
                                <label htmlFor="account"><p>To Account:</p></label>
                                <input 
                                    id="account" 
                                    type="text" 
                                    name="toAccount"
                                    value={recipientId}
                                    onChange={(e) => setId(e.target.value)}
                                ></input>
                            </div>
                            <div>
                                <label htmlFor="amount"><p>Amount:</p></label>
                                <input 
                                    id="amount" 
                                    type="number" 
                                    step="0.01" 
                                    name="amount"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                ></input>
                            </div>
                        </form>
                        <button 
                            className="btn"
                            onClick={handleTransfer}
                            disabled={isTransferDisabled}
                        >{transferResult}</button>
                    </div>

                    <div className="claim">
                        <p>Get your free Citrino Tokens here!<br/> Claim 10,000 CTNO to your account.</p>
                        <button
                            id="btn-payout" 
                            className="btn"
                            onClick={handleClaim}
                            disabled={isDisabled}
                        >{buttonText}</button>
                    </div>    

            </div>
        </div>

    );
};