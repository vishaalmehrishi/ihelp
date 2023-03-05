import React from "react";
import "./Header.css";
import { LocationWidget } from "../Location/LocationWidget";
function Header({
  updateGPSUserLocation,
  updateChosenUserCity,
  chosenUserCity
}) {
  const renderHeader = () => {
    return (
      <div className="header-root">
        <h1>Covid Resources</h1>
        <LocationWidget
          updateGPSUserLocation={updateGPSUserLocation}
          updateChosenUserCity={updateChosenUserCity}
          chosenUserCity={chosenUserCity}
        />
      </div>
    );
  };

  return renderHeader();
}

export { Header };
