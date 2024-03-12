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
            <svg width="76" height="76" viewBox="0 0 76 76" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6.32011 12.7056C-1.29991 22.2306 -1.63329 29.7078 5.60573 29.7078C8.74899 29.7078 9.60624 29.041 11.3207 25.3263C13.4162 20.9448 12.8924 20.7066 21.7983 29.6125L29.8945 37.7088L21.7983 45.8051C12.8924 54.711 13.4162 54.4728 11.3207 50.0913C9.60624 46.3766 8.74899 45.7098 5.60573 45.7098C-0.109284 45.7098 -1.25229 49.9008 2.5101 56.9017C7.41548 65.9029 18.3216 74.904 24.6082 75.0945C27.5609 75.1898 29.9422 72.7133 29.8945 69.6176C29.9422 66.903 29.1325 65.9029 25.3702 64.1407C20.6076 61.8547 20.4171 62.4262 29.4183 53.4251L37.5146 45.3288L45.849 53.6632L54.1357 61.95L51.2306 63.5216C45.6108 66.4744 44.1821 69.5224 46.611 73.0943C48.2778 75.6184 52.2784 75.6184 57.1837 72.999C62.7559 69.9986 70.7093 61.8547 73.4715 56.235C75.7099 51.5201 75.7575 49.2817 73.4715 46.9957C70.3759 43.9001 66.2801 45.6146 63.6608 50.9962C62.994 52.425 62.1368 53.568 61.7081 53.6156C61.3271 53.6156 57.5647 50.0437 53.2785 45.6622L45.6108 37.7088L53.088 29.9459C57.1837 25.7549 60.9461 22.0878 61.3748 21.8496C62.0415 21.5639 62.4701 22.0878 63.5179 24.1833C66.1849 29.803 70.3283 31.5652 73.5192 28.3743C75.7575 26.1359 75.7099 23.8975 73.4715 19.1826C70.7093 13.5629 62.7559 5.41897 57.1837 2.41859C52.2783 -0.200791 48.2778 -0.200798 46.611 2.32333C44.1821 5.89522 45.6108 8.94323 51.183 11.8484L54.1357 13.4676L45.849 21.7544L37.5146 30.0888L29.4183 21.9925C20.4171 12.9914 20.6076 13.5629 25.3702 11.2769C29.1325 9.51473 29.9422 8.5146 29.8945 5.79996C29.9422 2.70433 27.5609 0.22783 24.6082 0.32308C21.8935 0.370705 17.6073 2.46621 13.9401 5.46659C12.3209 6.8001 10.5587 8.27647 9.93962 8.7051C9.32049 9.13373 7.70124 10.9435 6.32011 12.7056Z" fill="white"/>
            </svg>
          </div>

          <div className="dashboard--container">
            <div className="flex flex-col align-center justify-center text-center gap-16 dashboard--welcome">
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
