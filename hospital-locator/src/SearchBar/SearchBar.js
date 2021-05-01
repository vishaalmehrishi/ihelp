import React, { useState } from "react";
import "./SearchBar.css";
import cityList from "../__mocks__/cities.json";

const SearchBar = () => {
  const [searchCity, updateSearchCity] = useState("");

  const setSearchCity = (e) => {
    updateSearchCity(e.target.value);
  };

  const renderCity = (city, key) => {
    return (
      <li key={key} className="cityText">
        {city.name}
      </li>
    );
    // var code = city.code.toLowerCase()

    /*if( search !== "" && country.name.toLowerCase().indexOf( search.toLowerCase() ) === -1 ){
          return null
      }*/
  };

  const filteredCities = cityList
    .filter((city) => {
      if (searchCity === "") {
        return "";
      } else if (city.name.toLowerCase().includes(searchCity.toLowerCase())) {
        return city;
      }
      return "";
    })
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((city, key) => renderCity(city, key));
  return (
    <div className="searchbar-root">
      <div className="searchbar-container">
        <input
          type="text"
          placeholder="Search city.. "
          onChange={setSearchCity}
        />
        <ul
          className={
            searchCity === "" || filteredCities.length === 0
              ? "cityList hideCityList"
              : "cityList"
          }
        >
          {filteredCities}
        </ul>
      </div>
    </div>
  );
};

export default SearchBar;
