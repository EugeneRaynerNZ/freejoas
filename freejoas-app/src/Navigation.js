import './App.css';
import { NavLink } from "react-router-dom";

import HomeIcon from '@mui/icons-material/Home';
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import UploadIcon from '@mui/icons-material/Upload';

import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import DirectionsWalkOutlinedIcon from '@mui/icons-material/DirectionsWalkOutlined';
import UploadOutlinedIcon from '@mui/icons-material/UploadOutlined';

function Navigation() {
  return (
    <footer className="flex">
      <nav className="flex text-center">
        <li className="nav-link">
          <NavLink to="/dashboard" className={({ isActive, isPending }) => (isPending ? "pending" : isActive ? "active" : "")}>
            {({ isActive }) => (
              <>{isActive ? <HomeIcon fontSize="large" /> : <HomeOutlinedIcon fontSize="large" />} Home</>
            )}
          </NavLink>
        </li>
        <li className="nav-link">
          <NavLink to="/play" className={({ isActive, isPending }) => (isPending ? "pending" : isActive ? "active" : "")}>
            {({ isActive }) => (
              <>{isActive ? <DirectionsWalkIcon fontSize="large" /> : <DirectionsWalkOutlinedIcon fontSize="large" />} Explore</>
            )}
          </NavLink>
        </li>
        <li className="nav-link">
          <NavLink to="/upload" className={({ isActive, isPending }) => (isPending ? "pending" : isActive ? "active" : "")}>
            {({ isActive }) => (
              <>{isActive ? <UploadIcon fontSize="large" /> : <UploadOutlinedIcon fontSize="large" />} Upload</>
            )}
          </NavLink>
        </li>
      </nav>
    </footer>
  );
}

export default Navigation;
