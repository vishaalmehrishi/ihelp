import React from "react";
import "./Header.css";
import { LocationWidget } from "../Location/LocationWidget";
import "../SearchBar/SearchBar";
function Header({ updateGPSUserLocation }) {
  const renderHeader = () => {
    return (
      <div className="header-root">
        <h1>Covid Resources</h1>
        <LocationWidget updateGPSUserLocation={updateGPSUserLocation} />
      </div>
    );
  };

  return renderHeader();
}

export { Header };
