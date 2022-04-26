import React, { useState } from "react";


export default function Connect(props) {

    return (
        <div className="magic-card">
            <div className="magic-card-top">
            
                <div>
                    <div className="logo-size-container">
                        <div className="token-logo">
                            <div className="token-logo-top">
                                <img src="./images/logo.png" alt="token-logo"></img>
                                
                            </div>
                        </div>
                    </div>
                    <h2 className="currency-name">Citrino</h2>
                </div>

                <div className="Iid">
                    <h2>PRINCIPAL ID</h2>
                    <p className="side-pad">{props.iid}</p>
                </div>

                <button 
                    className="btn"
                    onClick={() => props.connected(true)}
                >
                CONNECT
                </button>
                
            </div>
        </div>
    );
};