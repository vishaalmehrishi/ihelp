import SearchBar from "../SearchBar/SearchBar";
import "./homepage.css";
import "../SearchBar/SearchBar";
import { HospitalList } from "../HospitalList/HospitalList";
import { LocationWidget } from "../location/LocationWidget";
import testData from "../__mocks__/testData.json";

function HomePage() {
  return (
    <div className="homepage-root">
      <SearchBar />
      <LocationWidget />
      <HospitalList hospitals={testData} />
    </div>
  );
}

export default HomePage;
