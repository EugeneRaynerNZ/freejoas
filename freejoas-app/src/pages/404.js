import React from 'react';
import '../App.scss';
import { NavLink } from "react-router-dom";
import Image404 from '../images/404-image.png';


function PageNotFound() {
  return (
    <section className="PageNotFound">
        <div className="backgroundWash"></div>
        <div className="PageNotFound--container">
            <div className="PageNotFound--text-container">
                <h1>Oops!</h1>
                <p>Sorry, no luck here! This page is as empty as this tree.</p>
            </div>
            <div className="PageNotFound--image-container">
                <img src={Image404} alt="Empty Tree"/>
                <NavLink className="cta--button cta--button-primary" to="/dashboard" >Take Me Home</NavLink>
            </div>
        </div>
    </section>
  );
}

export default PageNotFound;
