import image from './freejoas-image.png';
import Main from './pages/Main';
import Navigation from './Navigation';
import './App.css';

function App() {
  return (
    <>
      <Navigation />

      <main>
        <div>
          <h2>Find your</h2>
          <h1>Freejoas</h1>
          <h2>Today</h2>
        </div>
        <div>
          <img src={image} />
        </div>
      </main>

      <Main />

    </>
  );
}

export default App;
