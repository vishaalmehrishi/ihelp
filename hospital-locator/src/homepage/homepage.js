import SearchBar from "../SearchBar/SearchBar";
import "./homepage.css";
import "../SearchBar/SearchBar";
import { HospitalList } from "../hospitalList/HospitalList";

function HomePage() {
  return (
    <div className="homepage-root">
      <SearchBar />
      <HospitalList />
    </div>
  );
}

export default HomePage;
