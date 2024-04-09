import { BrowserRouter } from "react-router-dom";
import Router from "./components/Router";
import { CookieProvider } from './components/CookieContext';


import './App.css';

function App() {
  return (
    <CookieProvider>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </CookieProvider>
  );
}

export default App;
