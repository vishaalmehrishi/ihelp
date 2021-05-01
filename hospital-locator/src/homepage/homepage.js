
import SearchBar from '../SearchBar/SearchBar';
import './HomePage.css';
import '../SearchBar/SearchBar';

function HomePage() {
  return (
    <div className="homepage-root">
     
      <header className="homepage-header">
        <SearchBar />
        
        <p className="homepage-text">
          Hello world
        </p>
       
        
      </header>
    </div>
  );
}

export default HomePage;