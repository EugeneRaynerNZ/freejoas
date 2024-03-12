import React from 'react';
import { useState, useEffect } from 'react';
import '../../App.css';
import Navigation from "../../Navigation";
import MeterToKilometerConverter from "../../components/KilometerConverter"
import PreviousActivityExample from "../../previousActivity.json";
import axios from '../../axios';

function Dashboard() {

  const [user, setUser] = useState({});

  useEffect(() => {

    // Want to use async/await? Add the `async` keyword to your outer function/method.
    async function fetchData() {
      try {
        const response = await axios.get('/user/all');
        console.log(response)
        setUser(response.data)
        console.log(user)
      } catch (error) {
        console.error(error);
      }
    }
    
    fetchData();
    // if [], run once when the row loads, and don't run again (only on page load)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (

      <section className="dashboard w-full main-container flex flex-col">

        <div className="main-container--top flex flex-col">

          <div className="logo-mark">
            <svg width="39" height="39" viewBox="0 0 39 39" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3.66005 6.85281C-0.149957 11.6153 -0.316643 15.3539 3.30287 15.3539C4.8745 15.3539 5.30312 15.0205 6.16037 13.1631C7.20812 10.9724 6.94619 10.8533 11.3991 15.3063L15.4473 19.3544L11.3991 23.4025C6.94619 27.8555 7.20812 27.7364 6.16037 25.5457C5.30312 23.6883 4.87449 23.3549 3.30287 23.3549C0.445358 23.3549 -0.126144 25.4504 1.75505 28.9509C4.20774 33.4514 9.66082 37.952 12.8041 38.0473C14.2805 38.0949 15.4711 36.8566 15.4473 35.3088C15.4711 33.9515 15.0663 33.4514 13.1851 32.5704C10.8038 31.4274 10.7086 31.7131 15.2091 27.2125L19.2573 23.1644L23.4245 27.3316L27.5679 31.475L26.1153 32.2608C23.3054 33.7372 22.591 35.2612 23.8055 37.0471C24.6389 38.3092 26.6392 38.3092 29.0919 36.9995C31.8779 35.4993 35.8546 31.4274 37.2358 28.6175C38.355 26.26 38.3788 25.1409 37.2358 23.9979C35.6879 22.45 33.6401 23.3073 32.3304 25.9981C31.997 26.7125 31.5684 27.284 31.3541 27.3078C31.1636 27.3078 29.2824 25.5219 27.1392 23.3311L23.3054 19.3544L27.044 15.473C29.0919 13.3774 30.9731 11.5439 31.1874 11.4248C31.5208 11.2819 31.7351 11.5439 32.2589 12.5916C33.5924 15.4015 35.6641 16.2826 37.2596 14.6871C38.3788 13.568 38.355 12.4488 37.2358 10.0913C35.8546 7.28143 31.8779 3.20949 29.0919 1.7093C26.6392 0.399605 24.6389 0.399601 23.8055 1.66167C22.591 3.44761 23.3054 4.97161 26.0915 6.42418L27.5679 7.2338L23.4245 11.3772L19.2573 15.5444L15.2091 11.4963C10.7086 6.99568 10.8038 7.28143 13.1851 6.13843C15.0663 5.25736 15.4711 4.7573 15.4473 3.39998C15.4711 1.85217 14.2805 0.613915 12.8041 0.66154C11.4468 0.685353 9.30363 1.7331 7.47006 3.2333C6.66044 3.90005 5.77937 4.63824 5.46981 4.85255C5.16024 5.06686 4.35062 5.97174 3.66005 6.85281Z" fill="white"/>
            </svg>
          </div>

          <div className="dashboard--container">
            <div className="flex flex-col align-center justify-center text-center dashboard--welcome">
              <div className="flex align-center justify-center flex-col gap-2">
                <p>Welcome back</p>
                <h1>Eugene</h1>
              </div>
            </div>

            <div className="dashboard--previous-activity flex flex-col gap-2">
              <h2>Recent Activity</h2>
              <div className="dashboard--previous-activity--container pb-4 flex">
                {PreviousActivityExample.map(activity => (
                  <div className="flex flex-col gap-2 cursor-pointer rounded-md" key={activity._id}>
                    <div className="previous-activity--image"></div>
                    <div className="flex flex-col gap-1">
                      <span className="previous-acitivty--date">On {activity.date}</span>
                      <span className="previous-acitivty--name">{activity.name}</span>
                      <span className="previous-acitivty--distance">You walked <MeterToKilometerConverter meters={activity.distance} /></span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

        <div className="main-container--bottom">
          <Navigation />
        </div>

      </section>

  );
}

export default Dashboard;
