import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import { AuthClient } from "@dfinity/auth-client";
import { token } from "../../declarations/token"


const init = async () => {
  
  const authClient = await AuthClient.create();

  if (await authClient.isAuthenticated()) {

    handleAuthenticated(authClient);
    
  } else {

    await authClient.login({
      identityProvider: "https://identity.ic0.app/#authorize",
      onSuccess: () => {
        handleAuthenticated(authClient);
      }
    });

  };

}

async function handleAuthenticated(authClient) {
  // IC DEPLOY
  // const identity = await authClient.getIdentity();
  // const userPrincipal = identity._principal.toString();

  // LOCAL DEPLOY
  const userPrincipal = await token.getCaller();

  ReactDOM.render(<App loggedInPrincipal={userPrincipal}/>, document.getElementById('root'));
};

init();
