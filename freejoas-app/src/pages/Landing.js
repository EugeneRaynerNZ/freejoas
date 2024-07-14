import React from 'react';
import '../App.css';
import { NavLink } from "react-router-dom";
import WebsiteNavigationLogo from '../images/desktop/website/Logo.svg';
import WebsiteHome from '../images/desktop/website/landing-image.png';
import WebsiteAbout from '../images/desktop/website/feijoas-about.png';
import WebsiteExplore from '../images/desktop/website/feijoa--walking.svg';



function Landing() {
  return (
    <div className="website">
      <nav className="website--navigation">
        <div className="website--navigation-container">
          <div className="website--navigation-logo">
            <img src={WebsiteNavigationLogo} alt="Freejoas" />
          </div>
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#explore">Explore</a></li>
            <li><a href="#upload">Upload</a></li>
          </ul>
          <div className="website--navigation-buttons">
            <button className="website--navigation-sign-in">Sign in</button>
            <button className="website--navigation-sign-up">Sign up</button>
          </div>
        </div>
      </nav>
      <section id="home" className="website--section">
        <div className="backgroundWash"></div>
        <div className="website-page--container">
          <div className="website-page--text-container">
            <h1>Let's find some free Feijoas!</h1>
            <p>If you live in New Zealand, sign up to find freejoas near you.</p>
            <NavLink className="cta--button cta--button-primary" to="/home" >Explore Now</NavLink>
          </div>
          <div className="website-page--image-container">
            <img style={{maxWidth: "350px"}} src={WebsiteHome} alt="Feijoa Tree"/>
          </div>
        </div>
      </section>
      <section id="about" className="website--section">
        <div className="backgroundWash"></div>
        <div className="website-page--container">
          <div className="website-page--text-container">
            <h2>Feijoas are everywhere. We just need to find them.</h2>
            <p>Supermarkets sell Feijoas only during Feijoa season, but did you know that there are plenty of free Feijoa trees near you? Find some Feijoas today!</p>
            <NavLink className="cta--button cta--button-primary" to="/register" >Sign up</NavLink>
          </div>
          <div className="website-page--image-container">
            <img src={WebsiteAbout} alt="Feijoa Tree"/>
          </div>
        </div>
      </section>
      <section id="explore" className="website--section">
        <div className="backgroundWash"></div>
        <div className="website-page--container">
          <div className="website-page--image-container">
          <img style={{maxWidth: "250px"}} src={WebsiteExplore} alt="Feijoa Tree"/>
          </div>
          <div className="website-page--text-container">
            <h2>Feijoas are everywhere. We just need to find them.</h2>
            <p>Supermarkets sell Feijoas only during Feijoa season, but did you know that there are plenty of free Feijoa trees near you? Find some Feijoas today!</p>
            <NavLink className="cta--button cta--button-primary" to="/register" >Sign up</NavLink>
          </div>
        </div>
      </section>
      <section id="upload" className="website--section">
        <div className="backgroundWash"></div>
        <div className="website-page--container">
          <div className="website-page--text-container">
            <h2>Feijoas are everywhere. We just need to find them.</h2>
            <p>Supermarkets sell Feijoas only during Feijoa season, but did you know that there are plenty of free Feijoa trees near you? Find some Feijoas today!</p>
            <NavLink className="cta--button cta--button-primary" to="/register" >Sign up</NavLink>
          </div>
          <div className="website-page--image-container">
            <img src={WebsiteAbout} alt="Feijoa Tree"/>
          </div>
        </div>
      </section>
      {/* <footer></footer> */}
    </div>
  );
}

export default Landing;
