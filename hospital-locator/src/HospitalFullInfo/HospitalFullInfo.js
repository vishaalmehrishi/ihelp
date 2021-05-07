import { useLocation, Link } from "react-router-dom";
import { FaBed, FaPhone } from "react-icons/fa";
import { RiPinDistanceLine } from "react-icons/ri";
import "./HospitalFullInfo.css";

const HospitalFullInfo = () => {
  const location = useLocation();
  const hospital = location.state?.hospital;
  const localDateTime = new Date(
    hospital?.properties.last_updated
  ).toUTCString();
  return (
    <div className="hospitalFullInfo">
      <Link to="/" className="backLink">
        Go back
      </Link>
      <h2>{hospital.properties.name_english}</h2>
      <p
        className={`access-badge ${
          hospital.properties.access.toLowerCase() === "free"
            ? "access-free"
            : "access-paid"
        }`}
      >
        {hospital.properties.access}
      </p>
      <h3 className="lastUpdatedHeading">Last Updated</h3>
      <p className="lastUpdated">{localDateTime}</p>
      <h3>Available Beds</h3>
      <p>
        <FaBed className="hospitalBedIcon" aria-hidden="true" />
        {hospital.properties["available_beds"]}
      </p>
      <h3>Contact Number</h3>
      <p>
        <FaPhone className="hospitalPhoneIcon" aria-hidden="true" />{" "}
        {hospital.properties.phone}
      </p>
      <h3>Address</h3>
      <address>
        <p>{hospital.properties.street_address}</p>
        <p>{hospital.properties.city}</p>
        <p>{hospital.properties.postal_code}</p>
      </address>
      <h3>Website</h3>
      <a href={hospital.properties.url}>{hospital.properties.url}</a>
    </div>
  );
};

export default HospitalFullInfo;
