import React from 'react';
import image from '../freejoas-image.png';
import '../App.css';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";



function Home() {
  return (

    <main>
      <div>
        <h2>Find your</h2>
        <h1 className="text-3xl font-bold underline">Freejoas</h1>
        <h2>Today</h2>
      </div>
      <div>
        <img src={image} alt="Freejoas" />
      </div>

      <GoogleLogin
        onSuccess={credentialResponse => {
          console.log(credentialResponse);
          const decoded = jwtDecode(credentialResponse.credential);
          console.log(decoded);
        }}
        onError={() => {
          console.log('Login Failed');
        }}
      />
    </main>

  );
}

export default Home;
