import React from "react";
import { usePermission, useLocation, getCityFromCoordinates } from "./Location";
import { RiUserLocationLine } from "react-icons/ri";
import "./LocationWidget.css";

const useInterval = (callback, intervalMS, deps) => {
  React.useEffect(() => {
    let timer = setTimeout(() => callback(), intervalMS);
    return () => {
      clearTimeout(timer);
    };
  }, [callback, intervalMS, deps]);
};

const useLoadingText = () => {
  const [counter, setCounter] = React.useState(0);
  const text = "Determining Location.";

  // Creating animated elipses on text
  useInterval(
    () => {
      setCounter(counter + 1);
    },
    400,
    counter
  );

  return text + ".".repeat(counter % 3);
};

const LocationWidget = ({
  updateGPSUserLocation,
  updateChosenUserCity,
  chosenUserCity
}) => {
  const [locationAccess] = usePermission("geolocation");
  // Only update location every 5 minutes
  const [location, locationError] = useLocation(true, 300000, 300000);
  const loadingText = useLoadingText();
  const [cityName, setCityName] = React.useState();

  React.useEffect(() => {
    if (!location) {
      return;
    }
    // If the user has chosen a city from search, use that
    if (chosenUserCity !== undefined) {
      setCityName(`Searching near ${chosenUserCity.name}`);
    } else {
      // Else use gps user location
      getCityFromCoordinates(
        `${location.latitude},${location.longitude}`
      ).then((newCityName) => setCityName(`Searching near ${newCityName}`));
      updateGPSUserLocation(location);
    }
  }, [location, chosenUserCity, updateGPSUserLocation]);

  const locationFailed = () => locationAccess === "denined" || locationError;

  const getText = () => {
    return locationFailed()
      ? "Unable to determine location. Tap here to retry..."
      : !location
      ? loadingText
      : cityName;
  };

  const requestLocation = () => {
    // TODO: We may want to reload location in-place, rather than reloading the entire page.
    // Due to permissions behavior being different on select browsers, this was not straightforward.
    // For now, we will just reload the page which will request the user permission again.
    updateChosenUserCity(undefined);
    window.location.reload();
  };

  return (
    <div className="location-widget-root" onClick={requestLocation}>
      <RiUserLocationLine
        className="location-widget-icon"
        aria-labelledby="Distance to hospital"
      />
      <p className="location-widget-text">{getText()}</p>
    </div>
  );
};

export { LocationWidget };
