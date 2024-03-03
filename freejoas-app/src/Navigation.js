import './App.css';
import { NavLink } from "react-router-dom";

import HomeIcon from '@mui/icons-material/Home';
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import UploadIcon from '@mui/icons-material/Upload';

function Navigation() {
  return (
    <footer className="flex">
        <nav className="flex text-center">
            <li className="flex align-center justify-center"><NavLink to="/dashboard" className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "active" : ""}><HomeIcon fontSize="large"/></NavLink></li>
            <li className="flex align-center justify-center"><NavLink to="/play" className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "active" : ""}><DirectionsWalkIcon fontSize="large" /></NavLink></li>
            <li className="flex align-center justify-center"><NavLink to="/upload" className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "active" : ""}><UploadIcon fontSize="large" /></NavLink></li>
        </nav>
    </footer>
  );
}

export default Navigation;
