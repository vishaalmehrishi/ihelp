import "./HospitalList.css";
import testData from "../__mocks__/testData.json";
import { FaBed } from "react-icons/fa";

const HospitalList = ({ hospitals }) => {
  // TODO: Faking hospital data to show list
  // Would probably be more performant to recieve sorted data from the backend?
  const hospitalArr = testData.map((hospital, i) => {
    return <HospitalListItem key={`hospital-${i}`} hospital={hospital} />;
  });

  return <ul className="hospitalList">{hospitalArr}</ul>;
};

const HospitalListItem = ({ hospital }) => {
  /* From data scrape, expect hospital to contain
    name, lat, lon, type, total_beds, available_beds, rates_info, contact(arr)
  */
  const contactArr = hospital.contact.map((contactMethod, i, hospital) => {
    return (
      <p key={`${hospital.name}-contactMethod-${i}`}>
        Phone: {contactMethod.phone}
      </p>
    );
  });
  return (
    <li className="hospitalListItem">
      <div className="hospitalInfo">
        <h2>{hospital.name}</h2>
        <p>Distance From user</p>
        {contactArr}
      </div>
      <div className="hospitalBeds">
        <FaBed
          className="hospitalBedIcon"
          aria-labelledby="Number of available hospital beds"
        />
        <p>{hospital["available_beds"]}</p>
      </div>
    </li>
  );
};

export { HospitalList, HospitalListItem };
