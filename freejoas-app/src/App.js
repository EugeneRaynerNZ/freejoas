import { BrowserRouter } from "react-router-dom";
import Router from "./components/Router";
import { CookieProvider } from './contexts/CookieContext';
import AppProvider from './contexts/AppProvider';
import './Reset.css';

function App() {
  return (
    <CookieProvider>
      <AppProvider>
          <BrowserRouter>   
            <Router />  {/* // main section of the app */}
          </BrowserRouter>
      </AppProvider>
    </CookieProvider>
  );
}

export default App;
