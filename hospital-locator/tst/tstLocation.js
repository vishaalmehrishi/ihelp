const axios = require("axios");
var PLACES_API =
  "https://maps.googleapis.com/maps/api/place/nearbysearch/json?";
var PLACES_RADIUS = 100;
const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;
const AWS = require("aws-sdk");
const ddb = new AWS.DynamoDB({
  endpoint: new AWS.Endpoint("http://localhost:3002")
});

const getNearByHospitalsFromLocation = (coordinates) => {
  return new Promise((resolve, reject) => {
    const api = `${PLACES_API}location=${coordinates}&radius=${PLACES_RADIUS}&type=hospital&key=${GOOGLE_API_KEY}`;
    console.log("Running api:", api);
    axios.get(api).then((res) => {
      console.log(res.data);
    });
  });
};

const SaveBussinessInfo = () => {};

function startTest() {
  coordinates = `28.704060,77.102493`;
  getNearByHospitalsFromLocation(coordinates);
}

async function tstLocation() {
  console.log("Testing location apis");
  await startTest();
}

module.exports = tstLocation;
