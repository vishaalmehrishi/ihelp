import { useState } from "react";
import { Helmet } from "react-helmet";
import SearchBar from "../SearchBar/SearchBar";
import "./HomePage.css";
import "../SearchBar/SearchBar";
import { Header } from "../Header/Header";
import { HospitalList } from "../HospitalList/HospitalList";
import testData from "../__mocks__/testData.json";
import { getNearByHospitalsFromLocation } from "../Location/Location";

function HomePage({ lang = "en" }) {
  const [userCity, updateUserCity] = useState(undefined);
  getNearByHospitalsFromLocation(`28.704060,77.102493`);
  return (
    <div className="homepage-root">
      {/* Set html head attributes, including lang which should be able to change for users */}
      <Helmet htmlAttributes={{ lang }}>
        <meta charSet="utf-8" />
        <title>Covid Resources: Find the Nearest Hospital, Fast</title>
        <link rel="canonical" href="http://ihelp.app" />
      </Helmet>
      <Header />
      <SearchBar updateUserCity={updateUserCity} />
      <HospitalList hospitals={testData} userCity={userCity} />
    </div>
  );
}

export default HomePage;
