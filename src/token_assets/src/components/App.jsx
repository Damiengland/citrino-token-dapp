import React, { useState } from "react";
import Connect from "./connect";
import Trading from "./trading";


export default function App(props) {

    const [isConnected, setConnected] = useState(false)
    
    return (
        <div className="parent">

            { isConnected ? <Trading iid={props.loggedInPrincipal}/> : <Connect iid={props.loggedInPrincipal} connected={setConnected}/> }
            
        </div>
    );
};
