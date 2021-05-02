import { useEffect, useState } from "react";
import "./HospitalList.css";
import { FaBed } from "react-icons/fa";
import { RiPinDistanceLine } from "react-icons/ri";
import { useLocation } from "../Location/Location";
import straightDistanceInKm from "../utils/getDistance";

const HospitalList = ({ hospitals, limit }) => {
  // TODO: Faking hospital data to show list
  // Would probably be more performant to recieve sorted data from the backend?
  const [location] = useLocation();
  const [userLocation, setUserLocation] = useState();

  useEffect(() => {
    if (!location) {
      console.log("Waiting for location");
    } else {
      setUserLocation(location);
    }
  }, [location]);

  const distanceInKm = (hospitalLat, hospitalLong, userLat, userLong) => {
    /* Calculate distance "as the crow flies" */
    return straightDistanceInKm(hospitalLat, hospitalLong, userLat, userLong);
  };

  const hospitalArr = hospitals
    .sort((a, b) => {
      let distanceA, distanceB;
      if (userLocation) {
        distanceA = distanceInKm(
          a.lat,
          a.lon,
          userLocation.latitude,
          userLocation.longitude
        );
        distanceB = distanceInKm(
          b.lat,
          b.lon,
          userLocation.latitude,
          userLocation.longitude
        );
        // console.log("User Location", distanceA, distanceB);
      }
      /* Sorting by available beds and distance
        where available beds is more important
      */
      return b["available_beds"] === a["available_beds"]
        ? distanceB - distanceA
        : b["available_beds"] - a["available_beds"];
    })
    .map((hospital, i) => {
      const hospitalDistance = distanceInKm(
        hospital.lat,
        hospital.lon,
        userLocation.latitude,
        userLocation.longitude
      );
      return (
        <HospitalListItem
          key={`hospital-${i}`}
          hospital={hospital}
          distanceInKm={hospitalDistance.toFixed(2)}
        />
      );
    });

  return userLocation ? (
    <ul className="hospitalList">{hospitalArr}</ul>
  ) : (
    <p>Loading...</p>
  );
};

const renderHospitalDistance = (hospital, distance) => {
  // Display distance based on lat, long and current lat, long
  return (
    <div className="hospitalDistance">
      <RiPinDistanceLine
        className="hospitalDistanceIcon"
        aria-labelledby="Distance to hospital"
      />
      <p key={`${hospital.name}-distance`}>{distance}</p>
    </div>
  );
};

const HospitalListItem = ({ hospital, distanceInKm }) => {
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
        {contactArr}
      </div>

      {renderHospitalDistance(hospital, distanceInKm)}

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
