import React from 'react';
import image from '../example-2.svg';
import '../App.css';
import { NavLink } from "react-router-dom";


function Home() {
  return (

      <section className="home w-full">
        <div className="home--logo-container">
          <img src={image} style={{width: "320px"}}/>
        </div>
        <div className="home--title-container">
          <div className="home--title-container-text">
            <h1>Freejoas</h1>
            <p>Enjoy walking to find Feijoas today.</p>
          </div>
          <div className="home--title-container-button pb-4">
            <NavLink className="cta--button" to="/play" >Get Started</NavLink>
          </div>
        </div>
      </section>

  );
}

export default Home;
