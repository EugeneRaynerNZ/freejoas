import { BrowserRouter } from "react-router-dom";
import Router from "./components/Router";
import { CookieProvider } from './utils/CookieContext';
import { RecentVisitedProvider } from './utils/RecentVisitedContext';
import { UserProvider } from "./utils/UserContext";


import './App.css';

function App() {
  return (
    <CookieProvider>
      <UserProvider>
        <RecentVisitedProvider>
          <BrowserRouter>
            <Router />
          </BrowserRouter>
        </RecentVisitedProvider>
      </UserProvider>
    </CookieProvider>
  );
}

export default App;
