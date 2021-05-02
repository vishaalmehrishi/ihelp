import SearchBar from "../SearchBar/SearchBar";
import "./HomePage.css";
import "../SearchBar/SearchBar";
import { HospitalList } from "../HospitalList/HospitalList";
import { LocationWidget } from "../Location/LocationWidget";

function HomePage() {
  return (
    <div className="homepage-root">
      <div className="homepage-header">
        <SearchBar />
        <LocationWidget />
      </div>
      <HospitalList />
    </div>
  );
}

export default HomePage;
