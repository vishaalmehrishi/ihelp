import SearchBar from '../SearchBar/SearchBar';
import './HomePage.css';
import '../SearchBar/SearchBar';
import { HospitalList } from "../hospitalList/HospitalList";

function HomePage() {
  return (
    <div className="homepage-root">
     
      <header className="homepage-header">
        <SearchBar />
         <HospitalList />
        <p className="homepage-text">
          Hello world
        </p>
      </header>
    </div>
  );
}

export default HomePage;
