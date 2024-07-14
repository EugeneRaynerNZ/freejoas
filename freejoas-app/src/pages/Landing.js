import React, { useState, useEffect } from 'react';
import '../App.css';
import { NavLink } from "react-router-dom";
import ScrollNavLink from '../components/ScrollNavLink';
import WebsiteNavigationLogo from '../images/desktop/website/Logo.svg';
import WebsiteNavigationLogoMobile from '../images/desktop/website/Mobile-Logo.svg';
import WebsiteHome from '../images/desktop/website/feijoa--home.png';
import WebsiteAbout from '../images/desktop/website/feijoas-about.png';
import WebsiteExplore from '../images/desktop/website/feijoa--walking.svg';



function Landing() {

  const [isOpen, setIsOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('#home'); // Default active link

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Function to determine which section is in view
  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 60; // Adjust as needed for offset
      const sectionId = `#${section.getAttribute('id')}`;
      
      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + section.offsetHeight
      ) {
        setActiveLink(sectionId);
      }
    });
  };

  // Add scroll event listener on component mount
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="website">
      <nav className="website--navigation">
        <div className="website--navigation-container">
          <div className="website--navigation-logo">
            <img src={WebsiteNavigationLogo} className="desktop--logo" alt="Freejoas" />
            <img src={WebsiteNavigationLogoMobile} className="mobile--logo" alt="Freejoas" />
          </div>
          <div className="website--navigation-hamburger" onClick={toggleMenu}>
            <div className="hamburger-icon">
              <div className={`line ${isOpen ? 'line-open' : ''}`}></div>
              <div className={`line ${isOpen ? 'line-open' : ''}`}></div>
              <div className={`line ${isOpen ? 'line-open' : ''}`}></div>
            </div>
          </div>
          <ul className={`website--navigation-links ${isOpen ? 'open' : ''}`}>
            <li>
              <ScrollNavLink
                to="#home"
                activeLink={activeLink}
              >
                Home
              </ScrollNavLink>
            </li>
            <li>
              <ScrollNavLink
                to="#about"
                activeLink={activeLink}
              >
                About
              </ScrollNavLink>
            </li>
            <li>
              <ScrollNavLink
                to="#explore"
                activeLink={activeLink}
              >
                Explore
              </ScrollNavLink>
            </li>
            <li>
              <ScrollNavLink
                to="#upload"
                activeLink={activeLink}
              >
                Upload
              </ScrollNavLink>
            </li>
          </ul>
          <div className="website--navigation-buttons">
          <NavLink className="website--navigation-sign-in" to="/login" >Sign in</NavLink>
          <NavLink className="website--navigation-sign-up" to="/register" >Sign up</NavLink>
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
