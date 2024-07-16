import { BrowserRouter } from "react-router-dom";
import Router from "./components/Router";
import { CookieProvider } from './utils/CookieContext';
import { RecentVisitedProvider } from './utils/RecentVisitedContext';
import { UserProvider } from "./utils/UserContext";


import './Reset.css';
// import Navigation from "./Navigation";

function App() {
  return (
    <CookieProvider>
      <UserProvider>
        <RecentVisitedProvider>
          <BrowserRouter>   
          {/* 
            the naviagtion component should be here,
            so it will be displayed on the left side of the screen 
            and will not be refreshed when the page is changed
           */}
           
            {/* <Navigation /> */}

            {/* 
              the router is where to display the main contents, 
              so we only refash the right side of the screen without change the navigation
             */}
            <Router />
          </BrowserRouter>
        </RecentVisitedProvider>
      </UserProvider>
    </CookieProvider>
  );
}

export default App;
