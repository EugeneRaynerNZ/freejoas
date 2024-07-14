import React, { useEffect } from 'react';
import Navigation from "../../Navigation";
// import MeterToKilometerConverter from "../../components/KilometerConverter";
// import PreviousActivityExample from "../../previousActivity.json";
import '../../App.css';
import { CookieInstance, KEY_USER } from '../../utils/CookieContext';
import { useNavigate } from 'react-router-dom';
import { useRecentVisited } from '../../utils/RecentVisitedContext';
import { FaTree } from "react-icons/fa";
import LogoPlaceholder from '../../images/example-2.svg'
import LocalStorageManager, { KEY_RECENT_VISITED } from '../../utils/LocalStorageManager';
import { useUser } from '../../utils/UserContext';



function Dashboard() {
  const navigator = useNavigate();
  //get functions from the useCookie hook
  const { logout, getCookie } = CookieInstance;
  const { recentVisited, setRecentVisited } = useRecentVisited();
  const { user, setUser } = useUser();


  const handleLogout = () => {
    logout();
    setRecentVisited([]);
    setUser(null);
    navigator('/');
  };

  const fetchRecentVisited = (userId) => {
    const recentVisited = LocalStorageManager.getUserData(userId, KEY_RECENT_VISITED);
    if (recentVisited) {
      setRecentVisited(() => (recentVisited));
    }
  };

  useEffect(() => {
    console.log("dashboard use effect");
    if(!user){

      const cookieUser = getCookie(KEY_USER);
      if(cookieUser){
        setUser(()=>(cookieUser));
      }else{
        logout();
      }
    }
    if (user) {
      fetchRecentVisited(user._id);
    }
    console.log("user: ", user);
    console.log("recentVisited: ", recentVisited);
    // this will run only once when the component is mounted
    // eslint-disable-next-line
  }, [user]);

  return (

    <section className="dashboard w-full main-container flex flex-col">
      <div className="main-container--top flex flex-col">

        <div className="logo-mark">
          <svg className="rotating" width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M17 34C26.3888 34 34 26.3888 34 17C34 7.61116 26.3888 0 17 0C7.61116 0 0 7.61116 0 17C0 26.3888 7.61116 34 17 34ZM17 30.94C9.30115 30.94 3.06 24.6988 3.06 17C3.06 9.30115 9.30115 3.06 17 3.06C24.6988 3.06 30.94 9.30115 30.94 17C30.94 24.6988 24.6988 30.94 17 30.94ZM7.77987 10.8632C6.43868 12.8864 8.07262 15.2716 10.4584 15.7191L13.4211 16.2747C14.1706 16.4153 14.8745 15.8608 15.4288 15.3371C15.9831 14.8133 16.5765 14.1419 16.4786 13.3857L16.0916 10.3963C15.7799 7.98899 13.491 6.22265 11.3951 7.44715C10.6764 7.86707 10.0036 8.36965 9.39165 8.94792C8.77966 9.52619 8.2398 10.1694 7.77987 10.8632ZM15.7228 23.4141C15.2753 25.7998 12.8901 27.4338 10.8669 26.0926C10.1731 25.6326 9.52991 25.0928 8.95163 24.4808C8.37336 23.8688 7.87078 23.1961 7.45086 22.4774C6.22636 20.3815 7.9927 18.0926 10.4 17.7809L13.3894 17.3938C14.1456 17.2959 14.8171 17.8894 15.3408 18.4437C15.8645 18.9979 16.419 19.7019 16.2785 20.4513L15.7228 23.4141ZM23.4178 18.1497C25.8035 18.5971 27.4375 20.9823 26.0963 23.0055C25.6364 23.6993 25.0965 24.3425 24.4845 24.9208C23.8725 25.4991 23.1998 26.0017 22.4811 26.4216C20.3852 27.6461 18.0963 25.8797 17.7846 23.4725L17.3975 20.4831C17.2996 19.7268 17.8931 19.0554 18.4474 18.5317C19.0016 18.0079 19.7056 17.4534 20.4551 17.594L23.4178 18.1497ZM18.1534 10.4547C18.6008 8.0689 20.9861 6.43497 23.0093 7.77615C23.7031 8.23609 24.3462 8.77595 24.9245 9.38794C25.5028 9.99992 26.0054 10.6726 26.4253 11.3914C27.6498 13.4872 25.8835 15.7762 23.4762 16.0878L20.4868 16.4749C19.7305 16.5728 19.0591 15.9793 18.5354 15.4251C18.0116 14.8708 17.4571 14.1669 17.5977 13.4174L18.1534 10.4547Z" fill="#fff" />
          </svg>
          <svg className="logout" onClick={handleLogout} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.5013 10H1.66797M1.66797 10L4.58464 7.5M1.66797 10L4.58464 12.5" stroke="white" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M7.5 5.83268C7.51009 4.02016 7.59047 3.03857 8.23078 2.39825C8.96304 1.66602 10.1415 1.66602 12.4985 1.66602H13.3319C15.6889 1.66602 16.8675 1.66602 17.5996 2.39825C18.3319 3.13048 18.3319 4.30899 18.3319 6.66602V13.3327C18.3319 15.6897 18.3319 16.8682 17.5996 17.6004C16.9593 18.2408 15.9777 18.3212 14.165 18.3313M7.5 14.166C7.51009 15.9785 7.59047 16.9601 8.23078 17.6004C8.76521 18.1348 9.53729 18.2793 10.8317 18.3183" stroke="white" strokeWidth="1.25" strokeLinecap="round" />
          </svg>
        </div>

        <div className="dashboard--container">
          <h1 class="desktop-only page-heading">Dashboard</h1>
          <div className="flex flex-col align-center justify-center text-center dashboard--welcome">
            <div className="flex align-center justify-center flex-col gap-2">
              {user && (
                <div className="dashboard--header flex flex-col align-center justify-center text-center">
                  <div className="flex align-center justify-center flex-col gap-2">
                    <p>Welcome back</p>
                    <h2>{user.firstname}</h2>
                    {/* <h2>username: {user.username}</h2>
                        <h2>email: {user.email}</h2> */}
                  </div>

                </div>
              )}

            </div>
          </div>
          <div>

            {recentVisited.length === 0 || recentVisited === undefined || recentVisited === null ? 
            (<></>):
              (
              <div className="dashboard--previous-activity flex flex-col gap-2">
                <h3>Recent Activity</h3>
                <div className="dashboard--previous-activity--container pb-4 flex">
                {recentVisited.map(item => (
                  <li className="locations-list--item" key={item._id}>
                    {item.image ? (
                      <div className="location-list--item-image" style={{
                        backgroundImage: `url(${item.image[0].data})`,
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                      }}>

                      </div>
                    ) : (
                      <div className="location-list--item-image" style={{
                        backgroundImage: `url(${LogoPlaceholder})`,
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                      }}></div>
                    )}
                    <div className="location-list--item-container">
                      <div className="location-list--item-filter">
                        <div className="location-list--item-tree">
                          <span>{item.amount}</span>
                          <FaTree />
                        </div>
                      </div>
                      <span className="location-list--item-title">{item.title}</span>
                    </div>
                  </li>
              ))}
                </div>
              </div>

            ) }
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
