import React, { useState } from "react";
import "./SearchBar.css";
import locationDb from "location-database";

const SearchBar = ({ updateUserCity }) => {
  const [searchBarCity, updateSearchBarCity] = useState("");

  const setSearchBarCity = (e) => {
    updateSearchBarCity(e.target.value);
  };

  const handleCityClick = (e, city) => {
    // console.log(city);
    updateUserCity(city);
    updateSearchBarCity("");
  };

  const renderCity = (city, key) => {
    return (
      <li
        key={key}
        className="cityText"
        onClick={(e) => {
          handleCityClick(e, city);
        }}
      >
        {city.name}
      </li>
    );
    // var code = city.code.toLowerCase()

    /*if( search !== "" && country.name.toLowerCase().indexOf( search.toLowerCase() ) === -1 ){
          return null
      }*/
  };

  const filteredCities = locationDb
    .getStatesByCode("IN")
    .reduce((acc, state) => {
      return acc.concat(state.cities);
    }, [])
    .filter((city, i) => {
      // console.log(city);
      if (searchBarCity === "") {
        return "";
      } else if (
        city.name.toLowerCase().includes(searchBarCity.toLowerCase())
      ) {
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
          value={searchBarCity}
          onChange={setSearchBarCity}
        />
        <ul
          className={
            searchBarCity === "" || filteredCities.length === 0
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
