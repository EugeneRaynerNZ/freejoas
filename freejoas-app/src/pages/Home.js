import image from '../freejoas-image.png';
import '../App.css';

function Home() {
  return (

      <main>
        <div>
          <h2>Find your</h2>
          <h1 className="text-3xl font-bold underline">Freejoas</h1>
          <h2>Today</h2>
        </div>
        <div>
          <img src={image} />
        </div>
      </main>

  );
}

export default Home;
