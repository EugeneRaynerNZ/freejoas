import { BrowserRouter } from "react-router-dom";
import Navigation from "./Navigation";
import Body from "./components/Body";

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Body />
    </BrowserRouter>
  );
}

export default App;
