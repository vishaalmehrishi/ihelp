import SearchBar from "../SearchBar/SearchBar";
import "./HomePage.css";
import "../SearchBar/SearchBar";
import { Header } from "../Header/Header";
import { HospitalList } from "../HospitalList/HospitalList";
import testData from "../__mocks__/testData.json";

function HomePage() {
  return (
    <div className="homepage-root">
      <Header />
      <SearchBar /> 
      <HospitalList hospitals={testData} />
    </div>
  );
}

export default HomePage;
