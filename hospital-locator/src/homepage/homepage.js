import "./homepage.css";
import { HospitalList } from "../hospitalList/HospitalList";

function HomePage() {
  return (
    <div className="root">
      {/* Expect that Hospital List will take in a list of hospitals */}
      <HospitalList />
    </div>
  );
}

export default HomePage;
