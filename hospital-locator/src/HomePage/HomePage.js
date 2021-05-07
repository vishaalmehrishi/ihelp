import SearchBar from "../SearchBar/SearchBar";
import "./HomePage.css";
import "../SearchBar/SearchBar";
import { HospitalList } from "../HospitalList/HospitalList";
import testData from "../__mocks__/testData.json";
import { getNearByHospitalsFromLocation } from "../Location/Location";

function HomePage({ gpsUserLocation, chosenUserCity, updateChosenUserCity }) {
  getNearByHospitalsFromLocation(`28.704060,77.102493`);
  return (
    <div className="homepage-root">
      <SearchBar updateUserCity={updateChosenUserCity} />
      <HospitalList
        hospitals={testData}
        chosenUserCity={chosenUserCity}
        gpsUserLocation={gpsUserLocation}
      />
    </div>
  );
}

export default HomePage;
