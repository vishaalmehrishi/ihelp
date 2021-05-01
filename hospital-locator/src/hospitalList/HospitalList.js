import "./HospitalList.css";
import { FaBed } from "react-icons/fa";

const HospitalList = ({ hospital }) => {
  // Faking hospital data to show list
  const hospitals = Array.from(Array(5)).map((_, i) => {
    console.log(i);
    return <HospitalListItem key={`hospital-${i}`} hospital={hospital} />;
  });

  return <ul className="hospitalList">{hospitals}</ul>;
};

const HospitalListItem = ({ hospital }) => {
  return (
    <li className="hospitalListItem">
      <div className="hospitalInfo">
        <h2>Hospital Name</h2>
        <p>Distance From Hospital</p>
      </div>
      <div className="hospitalBeds">
        <FaBed className="hospitalBedIcon" title="Number of hospital beds" />
        <p>Num Beds</p>
      </div>
    </li>
  );
};

export { HospitalList, HospitalListItem };
