import React from 'react';
import { useState, useEffect } from 'react';
import '../../App.css';
import AppHeader from "./AppHeader";
import Navigation from "../../Navigation";
import MeterToKilometerConverter from "../../components/KilometerConverter"
import ExampleData from "../../previousActivity.json";
import axios from '../../axios';
import { NavLink } from "react-router-dom";

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

      <section className="dashboard w-full flex flex-col">

        <AppHeader />
        <div className="dashboard--title-container flex flex-col align-center justify-center text-center gap-16">
          <div className="dashboard--title-container-text flex align-center justify-center flex-col gap-2">
            <p>Welcome back,</p>
            <h1>Firstname</h1>
          </div>

          <div className="dashboard--title-container-button flex align-center justify-center flex-col gap-2">
            <NavLink to="/play" className="cta--button">Get Hunting!</NavLink>
          </div>
        </div>

        <div className="dashboard--previous-activity p-4 flex flex-col gap-2">
          <h2>Previous Activity</h2>
          <div className="dashboard--previous-activity--container flex flex-col gap-2">
            {ExampleData.map(activity => (
              <li className="p-2 flex flex-col gap-2 cursor-pointer rounded-md" key={activity._id}>
                <span className="text-slate-700">You walked <MeterToKilometerConverter meters={activity.distance} /></span>
                <span className="text-slate-700">On {activity.date}</span>
              </li>
            ))}
          </div>
        </div>

        <Navigation />
      </section>

  );
}

export default Dashboard;
