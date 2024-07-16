import '../../App.scss';
import { NavLink } from "react-router-dom";

import image from '../../images/example-2.svg';
import SettingsIcon from '@mui/icons-material/Settings';

function AppHeader() {
  return (
    <header className="app--header flex justify-between">
        <img src={image} alt="Freejoas" />
        <NavLink><SettingsIcon /></NavLink>
    </header>
  );
}

export default AppHeader;
