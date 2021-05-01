import SearchBar from "../SearchBar/SearchBar";
import "./homepage.css";
import "../SearchBar/SearchBar";
import { HospitalList } from "../hospitalList/HospitalList";

function HomePage() {
  return (
    <div className="homepage-root">
      <SearchBar />
      <HospitalList />
      <p className="homepage-text">Hello world</p>
    </div>
  );
}

export default HomePage;
