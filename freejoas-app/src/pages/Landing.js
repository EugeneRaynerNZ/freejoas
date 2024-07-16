import React, { useState, useEffect } from 'react';
import '../Website.scss';
import { NavLink } from "react-router-dom";
import ScrollNavLink from '../components/ScrollNavLink';
import WebsiteNavigationLogo from '../images/desktop/website/Logo.svg';
import WebsiteNavigationLogoMobile from '../images/desktop/website/Mobile-Logo.svg';
// import WebsiteHome from '../images/desktop/website/feijoa--home.png';
import WebsiteAbout from '../images/desktop/website/website-and-mobile.png';
import WebsiteExplore from '../images/desktop/website/feijoa--walking.svg';
import LandscapeNoClouds from '../images/desktop/landscape-no-clouds.svg'



function Landing() {
  const [activeLink, setActiveLink] = useState('#home'); // Default active link

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
          <ul className="website--navigation-links">
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
          <NavLink className="website--navigation-sign-up" to="/register" >Sign up for free</NavLink>
          </div>
        </div>
      </nav>
      <section id="home" className="website--section">
      
        <svg className="cloud cloud1" width="126" height="31" viewBox="0 0 126 31" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M125.721 17C126.121 17.8 125.888 19.3333 125.721 20H113.721H111.721L107.721 21L101.721 20L91.7208 23.5L63.2208 21V7H68.2208C68.7208 7 70.7208 4 71.2208 3.5C71.7208 3 74.7208 1.5 75.7208 1C76.7208 0.5 80.2208 0 81.2208 0C82.2208 0 85.2208 0 86.2208 0.5L91.2208 3C92.2208 3.5 94.7208 6 94.7208 6.5C94.7208 7 95.7208 7 96.2208 7C96.7208 7 97.7208 6.49999 99.7208 5.99999C101.721 5.49999 101.721 5.99999 103.221 5.99999C104.721 5.99999 107.721 8.49999 108.221 8.99999C108.621 9.39999 110.054 11.8333 110.721 13C111.221 12.8333 112.321 12.4 112.721 12C113.221 11.5 116.221 11 117.221 11C118.221 11 120.721 11.5 122.221 12.5C123.721 13.5 125.221 16 125.721 17Z" fill="#2E5374"/>
          <path d="M119.221 25C120.021 26.6 119.888 29.6667 119.721 31L0.220825 30.5C0.0541611 29.6667 -0.179176 27.6 0.220825 26C0.720825 24 1.22083 23.5 2.72083 21C4.22083 18.5 6.72083 17.5 9.22083 16C11.7208 14.5 15.2208 14 18.2208 14.5C20.6208 14.9 23.2208 16 24.2208 16.5C24.3875 15.5 25.0208 13 26.2208 11C27.7208 8.5 28.7208 7 34.2208 3.5C39.7208 0 44.7208 0 47.2208 0C49.7208 0 50.2208 0 55.7208 1.5C61.2208 3 65.2208 6 67.2208 8C69.2208 9.99999 69.7208 13.5 70.7208 12.5C71.7208 11.5 77.2208 8.5 80.7208 8C84.2208 7.5 89.2208 7.5 93.2208 9C97.2208 10.5 100.721 13.5 101.721 15L104.721 19.5C105.387 19.1667 107.021 18.5 108.221 18.5C109.721 18.5 111.221 19 113.221 19.5C115.221 20 118.221 23 119.221 25Z" fill="#768392"/>
        </svg>

        <svg className="cloud cloud2" width="126" height="31" viewBox="0 0 126 31" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M125.721 17C126.121 17.8 125.888 19.3333 125.721 20H113.721H111.721L107.721 21L101.721 20L91.7208 23.5L63.2208 21V7H68.2208C68.7208 7 70.7208 4 71.2208 3.5C71.7208 3 74.7208 1.5 75.7208 1C76.7208 0.5 80.2208 0 81.2208 0C82.2208 0 85.2208 0 86.2208 0.5L91.2208 3C92.2208 3.5 94.7208 6 94.7208 6.5C94.7208 7 95.7208 7 96.2208 7C96.7208 7 97.7208 6.49999 99.7208 5.99999C101.721 5.49999 101.721 5.99999 103.221 5.99999C104.721 5.99999 107.721 8.49999 108.221 8.99999C108.621 9.39999 110.054 11.8333 110.721 13C111.221 12.8333 112.321 12.4 112.721 12C113.221 11.5 116.221 11 117.221 11C118.221 11 120.721 11.5 122.221 12.5C123.721 13.5 125.221 16 125.721 17Z" fill="#2E5374"/>
          <path d="M119.221 25C120.021 26.6 119.888 29.6667 119.721 31L0.220825 30.5C0.0541611 29.6667 -0.179176 27.6 0.220825 26C0.720825 24 1.22083 23.5 2.72083 21C4.22083 18.5 6.72083 17.5 9.22083 16C11.7208 14.5 15.2208 14 18.2208 14.5C20.6208 14.9 23.2208 16 24.2208 16.5C24.3875 15.5 25.0208 13 26.2208 11C27.7208 8.5 28.7208 7 34.2208 3.5C39.7208 0 44.7208 0 47.2208 0C49.7208 0 50.2208 0 55.7208 1.5C61.2208 3 65.2208 6 67.2208 8C69.2208 9.99999 69.7208 13.5 70.7208 12.5C71.7208 11.5 77.2208 8.5 80.7208 8C84.2208 7.5 89.2208 7.5 93.2208 9C97.2208 10.5 100.721 13.5 101.721 15L104.721 19.5C105.387 19.1667 107.021 18.5 108.221 18.5C109.721 18.5 111.221 19 113.221 19.5C115.221 20 118.221 23 119.221 25Z" fill="#768392"/>
        </svg>

        <svg className="cloud cloud3" width="126" height="31" viewBox="0 0 126 31" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0.220861 16.7258C-0.179139 17.5129 0.054194 19.0215 0.220861 19.6774H12.2209H14.2209L18.2209 20.6613L24.2209 19.6774L34.2209 23.121L62.7209 20.6613V6.8871H57.7209C57.2209 6.8871 55.2209 3.93548 54.7209 3.44355C54.2209 2.95161 51.2209 1.47581 50.2209 0.983871C49.2209 0.491936 45.7209 0 44.7209 0C43.7209 0 40.7209 0 39.7209 0.491936L34.7209 2.95161C33.7209 3.44355 31.2209 5.90323 31.2209 6.39516C31.2209 6.8871 30.2209 6.8871 29.7209 6.8871C29.2209 6.8871 28.2209 6.39516 26.2209 5.90322C24.2209 5.41128 24.2209 5.90322 22.7209 5.90322C21.2209 5.90322 18.2209 8.3629 17.7209 8.85483C17.3209 9.24838 15.8876 11.6425 15.2209 12.7903C14.7209 12.6263 13.6209 12.2 13.2209 11.8064C12.7209 11.3145 9.72095 10.8226 8.72095 10.8226C7.72095 10.8226 5.22095 11.3145 3.72095 12.2984C2.22095 13.2823 0.720861 15.7419 0.220861 16.7258Z" fill="#2E5374"/>
          <path d="M6.72091 24.5968C5.92091 26.171 6.05425 29.1882 6.22091 30.5L125.721 30.0081C125.888 29.1882 126.121 27.1548 125.721 25.5806C125.221 23.6129 124.721 23.121 123.221 20.6613C121.721 18.2016 119.221 17.2177 116.721 15.7419C114.221 14.2661 110.721 13.7742 107.721 14.2661C105.321 14.6597 102.721 15.7419 101.721 16.2339C101.554 15.25 100.921 12.7903 99.7209 10.8226C98.2209 8.3629 97.2209 6.8871 91.7209 3.44355C86.2209 0 81.2209 0 78.7209 0C76.2209 0 75.7209 0 70.2209 1.47581C64.7209 2.95161 60.7209 5.90323 58.7209 7.87097C56.7209 9.8387 56.2209 13.2823 55.2209 12.2984C54.2209 11.3145 48.7209 8.3629 45.2209 7.87097C41.7209 7.37903 36.7209 7.37903 32.7209 8.85484C28.7209 10.3306 25.2209 13.2823 24.2209 14.7581L21.2209 19.1855C20.5543 18.8575 18.9209 18.2016 17.7209 18.2016C16.2209 18.2016 14.7209 18.6935 12.7209 19.1855C10.7209 19.6774 7.72091 22.629 6.72091 24.5968Z" fill="#768392"/>
        </svg>

        <img className="landscape--container" src={LandscapeNoClouds} alt="background" />

        <div className="website-page--title">
          <h1>Play the game of<br />find the Feijoa tree.</h1>
          <p>Get rewarded with delicious freejoas</p>
          <NavLink className="cta--button cta--button-primary" to="/home" >Explore Now</NavLink>
        </div>
      </section>
      <section id="about" className="website--section">
        <div className="website-page--container">
          <div className="website-page--text-container">
            <h2>Feijoas are everywhere. We just need to find them.</h2>
            <p>Supermarkets sell Feijoas only during Feijoa season, but did you know that there are plenty of free Feijoa trees near you? Find some Feijoas today!</p>
            <NavLink className="cta--button cta--button-primary" to="/register" >Sign up for free</NavLink>
          </div>
          <div className="website-page--image-container">
            <img src={WebsiteAbout} alt="Feijoa Tree"/>
          </div>
        </div>
      </section>
      <section id="explore" className="website--section">
        <div className="website-page--container">
          <div className="website-page--image-container">
          <img style={{maxWidth: "250px"}} src={WebsiteExplore} alt="Feijoa Tree"/>
          </div>
          <div className="website-page--text-container">
            <h2>Take your friends and family for a walk.</h2>
            <p>Use Freejoas to locate a Feijoa tree near you, then use the find functionality to make your way there. Treasure hunt's not your thing? Use the map instead.</p>
            <NavLink className="cta--button cta--button-primary" to="/register" >Sign up for free</NavLink>
          </div>
        </div>
      </section>
      <section id="upload" className="website--section">
        <div className="website-page--container">
          <div className="website-page--text-container">
            <h2>Know of a free Feijoa tree that no one ever visits?</h2>
            <p>Locate the Feijoa tree on the map and upload it's location. Or walk to the location and upload it once you're there.</p>
            <NavLink className="cta--button cta--button-primary" to="/register" >Sign up for free</NavLink>
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
