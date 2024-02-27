import { BrowserRouter } from "react-router-dom";
import Navigation from "./Navigation";
import Body from "./components/Body";
import { GoogleOAuthProvider } from '@react-oauth/google';
import GoogleOAuth from './client_secret.json';


import './App.css';

function App() {
  return (
    <BrowserRouter>
      <GoogleOAuthProvider clientId={GoogleOAuth.web.client_id}>
        <Navigation />
        <Body />
      </GoogleOAuthProvider>
    </BrowserRouter>
  );
}

export default App;
