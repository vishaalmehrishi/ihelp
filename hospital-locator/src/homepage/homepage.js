import logo from '../logo.svg';
import './homepage.css';

function HomePage() {
  return (
    <div className="root">
      <header className="homepage-header">
        <img src={logo} className="homepage-logo" alt="logo" />
        <p>
          Hello world
        </p>
        <a
          className="homepage-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default HomePage;