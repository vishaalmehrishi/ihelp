import SearchBar from "../SearchBar/SearchBar";
import "./HomePage.css";
import "../SearchBar/SearchBar";
import { HospitalList } from "../HospitalList/HospitalList";
import { LocationWidget } from "../location/LocationWidget";

function HomePage() {
  return (
    <div className="homepage-root">
      <SearchBar />
      <LocationWidget />
      <HospitalList />
    </div>
  );
}

export default HomePage;
