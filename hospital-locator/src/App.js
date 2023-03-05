import { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Helmet } from "react-helmet";
import HomePage from "./HomePage/HomePage";
import HospitalFullInfo from "./HospitalFullInfo/HospitalFullInfo";
import "./App.css";
import { Header } from "./Header/Header";
// import Amplify, { API, graphqlOperation } from "aws-amplify";
// import awsconfig from "./aws-exports";

// Amplify.configure(awsconfig);

function App() {
  const [chosenUserCity, updateChosenUserCity] = useState(undefined);
  const [gpsUserLocation, updateGPSUserLocation] = useState(undefined);
  const [userLang, updateUserLang] = useState("en");
  return (
    <Router>
      <div className="App">
        {/* Set html head attributes, including lang which should be able to change for users */}
        <Helmet htmlAttributes={{ userLang }}>
          <meta charSet="utf-8" />
          <title>Covid Resources: Find the Nearest Hospital, Fast</title>
          <link rel="canonical" href="http://ihelp.app" />
        </Helmet>
        <Header
          updateGPSUserLocation={updateGPSUserLocation}
          updateChosenUserCity={updateChosenUserCity}
          chosenUserCity={chosenUserCity}
        />
        <Switch>
          <Route
            path="/"
            exact
            render={() => (
              <HomePage
                gpsUserLocation={gpsUserLocation}
                chosenUserCity={chosenUserCity}
                updateChosenUserCity={updateChosenUserCity}
              />
            )}
          />
          <Route path="/hospital/:hospitalName" component={HospitalFullInfo} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
