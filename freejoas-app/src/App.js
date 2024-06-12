import { BrowserRouter } from "react-router-dom";
import Router from "./components/Router";
import { CookieProvider } from './components/CookieContext';
import { RecentVisitedProvider } from './components/RecentVisitedContext';


import './App.css';

function App() {
  return (
    <CookieProvider>
      <RecentVisitedProvider>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </RecentVisitedProvider>
    </CookieProvider>
  );
}

export default App;
