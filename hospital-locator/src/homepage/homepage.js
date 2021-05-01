import SearchBar from "../SearchBar/SearchBar";
import "./HomePage.css";
import "../SearchBar/SearchBar";
import { HospitalList } from "../HospitalList/HospitalList";

function HomePage() {
  return (
    <div className="homepage-root">
      <SearchBar />
      <HospitalList />
    </div>
  );
}

export default HomePage;
