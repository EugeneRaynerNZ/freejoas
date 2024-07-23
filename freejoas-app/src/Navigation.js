import './App.scss';
import { NavLink } from "react-router-dom";
// import { ReactComponent as HomeIcon } from './images/navigation/home.svg';
import { ReactComponent as ExploreIcon } from './images/navigation/explore.svg';
import { ReactComponent as UploadIcon } from './images/navigation/upload.svg';
import SmallLogo from './images/desktop/app/small-logo.svg';
import { useUser, useRecentVisited } from './utils/AppContext';
import { CookieInstance } from './utils/CookieContext';
import { useNavigate } from 'react-router-dom';

function Navigation() {
  const navigator = useNavigate();
  const { setUser } = useUser();
  const { logout } = CookieInstance;
  const {setRecentVisited} = useRecentVisited();

  const handleLogout = () => {
    logout();
    setRecentVisited([]);
    setUser(null);
    navigator('/');
  };  

  return (
    <div className="navigation--container flex">
      <div className="flex flex-col gap-12 w-full">
        <img className="desktop-only" src={SmallLogo} alt="Freejoas Logo"/>
        <nav className="flex text-center">
          {/* <li className="nav-link nav-link--home">
            <NavLink to="/dashboard" className={({ isActive, isPending }) => (isPending ? "pending" : isActive ? "active" : "")}>
              {({ isActive }) => (
                <>{isActive ? <HomeIcon fontSize="large" /> : <HomeIcon fontSize="large" />} <span>Home</span></>
              )}
            </NavLink>
          </li> */}
          <li className="nav-link nav-link--play">
            <NavLink to="/play" className={({ isActive, isPending }) => (isPending ? "pending" : isActive ? "active" : "")}>
              {({ isActive }) => (
                <>{isActive ? <ExploreIcon fontSize="large" /> : <ExploreIcon fontSize="large" />} <span>Explore</span></>
              )}
            </NavLink>
          </li>
          <li className="nav-link nav-link--upload">
            <NavLink to="/upload" className={({ isActive, isPending }) => (isPending ? "pending" : isActive ? "active" : "")}>
              {({ isActive }) => (
                <>{isActive ? <UploadIcon fontSize="large" /> : <UploadIcon fontSize="large" />} <span>Upload</span></>
              )}
            </NavLink>
          </li>
        </nav>
      </div>
      <div className="desktop-only navigation-logout">
        <button onClick={handleLogout}>
        <svg className="logout" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.5013 10H1.66797M1.66797 10L4.58464 7.5M1.66797 10L4.58464 12.5" stroke="#0A2E36" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M7.5 5.83268C7.51009 4.02016 7.59047 3.03857 8.23078 2.39825C8.96304 1.66602 10.1415 1.66602 12.4985 1.66602H13.3319C15.6889 1.66602 16.8675 1.66602 17.5996 2.39825C18.3319 3.13048 18.3319 4.30899 18.3319 6.66602V13.3327C18.3319 15.6897 18.3319 16.8682 17.5996 17.6004C16.9593 18.2408 15.9777 18.3212 14.165 18.3313M7.5 14.166C7.51009 15.9785 7.59047 16.9601 8.23078 17.6004C8.76521 18.1348 9.53729 18.2793 10.8317 18.3183" stroke="#0A2E36" strokeWidth="1.25" strokeLinecap="round" />
        </svg>
        </button>
      </div>
    </div>
  );
}

export default Navigation;
