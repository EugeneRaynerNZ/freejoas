import image from './freejoas-image.png';
import './App.css';

function App() {
  return (
    <>
      <header>
        <nav>
          <li><a href="#">Home</a></li>
          <li><a href="#">Play</a></li>
          <li><a href="#">About</a></li>
        </nav>
      </header>

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

    </>
  );
}

export default App;
