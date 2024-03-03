import React from 'react';
import image from '../../example-2.svg';
import '../../App.css';
import { NavLink } from "react-router-dom";
import Navigation from "../../Navigation";


function Dashboard() {
  return (

      <section className="dashboard w-full">
        <div className="dashboard--logo-container">
          <img src={image} style={{width: "320px"}}/>
        </div>
        <div className="dashboard--title-container">
          <div className="dashboard--title-container-text">
            <h1>Freejoas</h1>
            <p>Enjoy walking to find Feijoas today.</p>
          </div>
          <div className="dashboard--title-container-button pb-4">
            <NavLink className="cta--button" to="/login" >Login</NavLink>
          </div>
        </div>

        <Navigation />
      </section>

  );
}

export default Dashboard;
