import React from "react";
import { MsalProvider, useMsal } from "@azure/msal-react";
import { PublicClientApplication } from "@azure/msal-browser";
import Chat from "./Chat";

// Replace the following with your actual Microsoft Application IDs
const msalConfig = {
  auth: {
    clientId: "36221a03-3a74-429b-ac71-808428092daf"
    authority: "https://login.microsoftonline.com/facc5b7e-ab8c-4461-8e04-dd929747429f"
    redirectUri: window.location.origin // Keep the redirect URI as your origin for local or deployed app
  }
};

const msalInstance = new PublicClientApplication(msalConfig);

function SignIn() {
  const { instance } = useMsal();

  return (
    <button onClick={() => instance.loginPopup()}>
      Sign in with Microsoft
    </button>
  );
}

function Home() {
  const { accounts } = useMsal();

  if (accounts.length === 0) return <SignIn />;

  return (
    <div>
      <h2>Welcome, {accounts[0].name}</h2>
      <Chat />
    </div>
  );
}

export default function App() {
  return (
    <MsalProvider instance={msalInstance}>
      <Home />
    </MsalProvider>
  );
}
