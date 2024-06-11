import './App.css';
import { NavLink } from "react-router-dom";
import { ReactComponent as HomeIcon } from './images/navigation/home.svg';
import { ReactComponent as ExploreIcon } from './images/navigation/explore.svg';
import { ReactComponent as UploadIcon } from './images/navigation/upload.svg';

// import HomeIcon from '@mui/icons-material/Home';
// import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
// import UploadIcon from '@mui/icons-material/Upload';

// import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
// import DirectionsWalkOutlinedIcon from '@mui/icons-material/DirectionsWalkOutlined';
// import UploadOutlinedIcon from '@mui/icons-material/UploadOutlined';

function Navigation() {
  return (
    <footer className="flex">
      <nav className="flex text-center">
        <li className="nav-link nav-link--home">
          <NavLink to="/dashboard" className={({ isActive, isPending }) => (isPending ? "pending" : isActive ? "active" : "")}>
            {({ isActive }) => (
              <>{isActive ? <HomeIcon fontSize="large" /> : <HomeIcon fontSize="large" />} Home</>
            )}
          </NavLink>
        </li>
        <li className="nav-link nav-link--play">
          <NavLink to="/play" className={({ isActive, isPending }) => (isPending ? "pending" : isActive ? "active" : "")}>
            {({ isActive }) => (
              <>{isActive ? <ExploreIcon fontSize="large" /> : <ExploreIcon fontSize="large" />} Explore</>
            )}
          </NavLink>
        </li>
        <li className="nav-link nav-link--upload">
          <NavLink to="/upload" className={({ isActive, isPending }) => (isPending ? "pending" : isActive ? "active" : "")}>
            {({ isActive }) => (
              <>{isActive ? <UploadIcon fontSize="large" /> : <UploadIcon fontSize="large" />} Upload</>
            )}
          </NavLink>
        </li>
      </nav>
    </footer>
  );
}

export default Navigation;
