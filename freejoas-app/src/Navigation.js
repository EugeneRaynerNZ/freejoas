import './App.css';
import { Link } from "react-router-dom";

function Navigation() {
  return (
    <header>
        <nav>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/play">Play</Link></li>
            <li><Link to="/upload">Upload</Link></li>
        </nav>
    </header>
  );
}

export default Navigation;
