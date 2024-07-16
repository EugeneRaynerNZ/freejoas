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
      
        <svg className="cloud cloud1" width="123" height="60" viewBox="0 0 123 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3.62643 24.5968C2.82643 26.171 2.95976 29.1882 3.12643 30.5L122.626 30.0081C122.793 29.1882 123.026 27.1548 122.626 25.5806C122.126 23.6129 121.626 23.121 120.126 20.6613C118.626 18.2016 116.126 17.2177 113.626 15.7419C111.126 14.2661 107.626 13.7742 104.626 14.2661C102.226 14.6597 99.6265 15.7419 98.6265 16.2339C98.4598 15.25 97.8265 12.7903 96.6265 10.8226C95.1265 8.3629 94.1265 6.8871 88.6265 3.44355C83.1265 0 78.1265 0 75.6265 0C73.1265 0 72.6265 0 67.1265 1.47581C61.6265 2.95161 57.6265 5.90323 55.6265 7.87097C53.6265 9.8387 53.1265 13.2823 52.1265 12.2984C51.1265 11.3145 45.6265 8.3629 42.1265 7.87097C38.6265 7.37903 33.6265 7.37903 29.6265 8.85484C25.6265 10.3306 22.1265 13.2823 21.1265 14.7581L18.1265 19.1855C17.4598 18.8575 15.8265 18.2016 14.6265 18.2016C13.1265 18.2016 11.6265 18.6935 9.62646 19.1855C7.62646 19.6774 4.62643 22.629 3.62643 24.5968Z" fill="white"/>
          <path d="M26.3942 34.9538C26.4002 34.9693 26.4063 34.9847 26.4125 35C27.2219 37 28.5903 39.5602 30 40.5C31.5 41.5 32.286 42 33.5 42C34.4712 42 37.6087 40.8333 38.1483 40.5L40.5764 45C41.3858 46.5 44.2185 49.5 47.456 51C50.6934 52.5 54.7403 52.5 57.573 52C60.4058 51.5 64.8573 48.5 65.6667 47.5C66.476 46.5 66.8807 50 68.4994 52C70.1182 54 73.3556 57 77.8071 58.5C82.2586 60 82.6633 60 84.6867 60C86.7101 60 90.7569 60 95.2084 56.5C99.6599 53 100.469 51.5 101.683 49C102.655 47 103.167 44.5 103.302 43.5C104.111 44 106.216 45.1 108.158 45.5C110.586 46 113.419 45.5 115.442 44C117.466 42.5 119.489 41.5 120.703 39C121.917 36.5 122.322 36 122.727 34C123.051 32.4 122.862 30.3333 122.727 29.5L26.0078 29C18.8386 29.1667 4.4 29.4 4 29C3.5 28.5 2 28.5 1.5 28.5C1 28.5 0 29.5 0 31C0 32.2 0.333333 32.5 0.5 32.5C0.833333 33 2 34.2 4 35C6.5 36 8 32.5 8 35C8 37.5 10.5 41 15 42C19.5 43 23.8726 41.8153 25 40.5C25.9088 39.4398 26.2937 37.2046 26.3942 34.9538Z" fill="white"/>
        </svg>

        <svg className="cloud cloud2" width="123" height="60" viewBox="0 0 123 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3.62643 24.5968C2.82643 26.171 2.95976 29.1882 3.12643 30.5L122.626 30.0081C122.793 29.1882 123.026 27.1548 122.626 25.5806C122.126 23.6129 121.626 23.121 120.126 20.6613C118.626 18.2016 116.126 17.2177 113.626 15.7419C111.126 14.2661 107.626 13.7742 104.626 14.2661C102.226 14.6597 99.6265 15.7419 98.6265 16.2339C98.4598 15.25 97.8265 12.7903 96.6265 10.8226C95.1265 8.3629 94.1265 6.8871 88.6265 3.44355C83.1265 0 78.1265 0 75.6265 0C73.1265 0 72.6265 0 67.1265 1.47581C61.6265 2.95161 57.6265 5.90323 55.6265 7.87097C53.6265 9.8387 53.1265 13.2823 52.1265 12.2984C51.1265 11.3145 45.6265 8.3629 42.1265 7.87097C38.6265 7.37903 33.6265 7.37903 29.6265 8.85484C25.6265 10.3306 22.1265 13.2823 21.1265 14.7581L18.1265 19.1855C17.4598 18.8575 15.8265 18.2016 14.6265 18.2016C13.1265 18.2016 11.6265 18.6935 9.62646 19.1855C7.62646 19.6774 4.62643 22.629 3.62643 24.5968Z" fill="white"/>
          <path d="M26.3942 34.9538C26.4002 34.9693 26.4063 34.9847 26.4125 35C27.2219 37 28.5903 39.5602 30 40.5C31.5 41.5 32.286 42 33.5 42C34.4712 42 37.6087 40.8333 38.1483 40.5L40.5764 45C41.3858 46.5 44.2185 49.5 47.456 51C50.6934 52.5 54.7403 52.5 57.573 52C60.4058 51.5 64.8573 48.5 65.6667 47.5C66.476 46.5 66.8807 50 68.4994 52C70.1182 54 73.3556 57 77.8071 58.5C82.2586 60 82.6633 60 84.6867 60C86.7101 60 90.7569 60 95.2084 56.5C99.6599 53 100.469 51.5 101.683 49C102.655 47 103.167 44.5 103.302 43.5C104.111 44 106.216 45.1 108.158 45.5C110.586 46 113.419 45.5 115.442 44C117.466 42.5 119.489 41.5 120.703 39C121.917 36.5 122.322 36 122.727 34C123.051 32.4 122.862 30.3333 122.727 29.5L26.0078 29C18.8386 29.1667 4.4 29.4 4 29C3.5 28.5 2 28.5 1.5 28.5C1 28.5 0 29.5 0 31C0 32.2 0.333333 32.5 0.5 32.5C0.833333 33 2 34.2 4 35C6.5 36 8 32.5 8 35C8 37.5 10.5 41 15 42C19.5 43 23.8726 41.8153 25 40.5C25.9088 39.4398 26.2937 37.2046 26.3942 34.9538Z" fill="white"/>
        </svg>

        <svg className="cloud cloud3" width="123" height="60" viewBox="0 0 123 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M119.279 24.5968C120.079 26.171 119.946 29.1882 119.779 30.5L0.279053 30.0081C0.112389 29.1882 -0.120949 27.1548 0.279053 25.5806C0.779053 23.6129 1.27905 23.121 2.77905 20.6613C4.27905 18.2016 6.77905 17.2177 9.27905 15.7419C11.7791 14.2661 15.2791 13.7742 18.2791 14.2661C20.6791 14.6597 23.2791 15.7419 24.2791 16.2339C24.4457 15.25 25.0791 12.7903 26.2791 10.8226C27.7791 8.3629 28.7791 6.8871 34.2791 3.44355C39.7791 0 44.7791 0 47.2791 0C49.7791 0 50.2791 0 55.7791 1.47581C61.2791 2.95161 65.2791 5.90323 67.2791 7.87097C69.2791 9.8387 69.7791 13.2823 70.7791 12.2984C71.7791 11.3145 77.2791 8.3629 80.7791 7.87097C84.2791 7.37903 89.2791 7.37903 93.2791 8.85484C97.2791 10.3306 100.779 13.2823 101.779 14.7581L104.779 19.1855C105.446 18.8575 107.079 18.2016 108.279 18.2016C109.779 18.2016 111.279 18.6935 113.279 19.1855C115.279 19.6774 118.279 22.629 119.279 24.5968Z" fill="white"/>
          <path d="M96.5113 34.9538C96.5053 34.9693 96.4992 34.9847 96.493 35C95.6836 37 94.3152 39.5602 92.9055 40.5C91.4055 41.5 90.6196 42 89.4055 42C88.4343 42 85.2968 40.8333 84.7572 40.5L82.3291 45C81.5197 46.5 78.687 49.5 75.4495 51C72.2121 52.5 68.1653 52.5 65.3325 52C62.4997 51.5 58.0482 48.5 57.2389 47.5C56.4295 46.5 56.0248 50 54.4061 52C52.7874 54 49.5499 57 45.0984 58.5C40.6469 60 40.2422 60 38.2188 60C36.1954 60 32.1486 60 27.6971 56.5C23.2456 53 22.4362 51.5 21.2222 49C20.251 47 19.7384 44.5 19.6035 43.5C18.7941 44 16.6898 45.1 14.7473 45.5C12.3192 46 9.48643 45.5 7.46303 44C5.43962 42.5 3.41621 41.5 2.20216 39C0.988121 36.5 0.583435 36 0.178757 34C-0.144989 32.4 0.0438614 30.3333 0.178757 29.5L96.8977 29C104.067 29.1667 118.506 29.4 118.906 29C119.406 28.5 120.906 28.5 121.406 28.5C121.906 28.5 122.906 29.5 122.906 31C122.906 32.2 122.572 32.5 122.406 32.5C122.072 33 120.906 34.2 118.906 35C116.406 36 114.906 32.5 114.906 35C114.906 37.5 112.406 41 107.906 42C103.406 43 99.0329 41.8153 97.9055 40.5C96.9968 39.4398 96.6118 37.2046 96.5113 34.9538Z" fill="white"/>
        </svg>

        <img className="landscape--container" src={LandscapeNoClouds} alt="background" />

        <div className="website-page--title">
          <h1>Play the game of<br />find the feijoa tree.</h1>
          <p>Get rewarded with delicious freejoas</p>
          <NavLink className="cta--button cta--button-primary" to="/home" >Explore Now</NavLink>
        </div>
      </section>
      <section id="about" className="website--section">
        <div className="website-page--container">
          <div className="website-page--text-container">
            <h2>Feijoas are everywhere. We just need to find them.</h2>
            <p>Supermarkets sell feijoas only during feijoa season, but did you know that there are plenty of free feijoa trees near you? Find some feijoas today!</p>
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
            <p>Use Freejoas to locate a feijoa tree near you, then use the find functionality to make your way there. Treasure hunt's not your thing? Use the map instead.</p>
            <NavLink className="cta--button cta--button-primary" to="/register" >Sign up for free</NavLink>
          </div>
        </div>
      </section>
      <section id="upload" className="website--section">
        <div className="website-page--container">
          <div className="website-page--text-container">
            <h2>Know of a free feijoa tree that no one ever visits?</h2>
            <p>Locate the feijoa tree on the map and upload it's location. Or walk to the location and upload it once you're there.</p>
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
