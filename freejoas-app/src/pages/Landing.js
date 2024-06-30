import React from 'react';
import '../App.css';
import { NavLink } from "react-router-dom";
import LandingPageImage from '../images/landing/landing-image.png';


function Landing() {
  return (
    <section className="landing-page">
        <div className="backgroundWash"></div>
        <div className="landing-page--container">
            <div className="landing-page--text-container">
                <h1>Let's find some free Feijoas!</h1>
                <p>If you live in New Zealand, sign up to find freejoas near you.</p>
                <NavLink className="cta--button cta--button-primary" to="/home" >Explor Now</NavLink>
            </div>
            <div className="landing-page--image-container">
                <img src={LandingPageImage} alt="Feijoa Tree"/>
            </div>
        </div>
    </section>
  );
}

export default Landing;
