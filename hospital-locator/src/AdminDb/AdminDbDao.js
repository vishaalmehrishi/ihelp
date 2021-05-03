import React, { useState, useEffect } from 'react'

import Amplify, { API, graphqlOperation } from 'aws-amplify';
import awsconfig from '../aws-exports';
import {getHOSPITAL, listHOSPITALs} from "../graphql/queries";
Amplify.configure(awsconfig);

function ListHospitals() {

    console.log("Getting List of Hospitals");

    const [names, setHospitalData] = useState([]);

    useEffect(() => {
        listHospitals();
    }, []);

    const listHospitals = async () => {
        console.log("Inside listHospitals")
        try {
            const hospitalData = await API.graphql(graphqlOperation(listHOSPITALs));
            console.log("Hospital data is: ");
            console.log(hospitalData);
            setHospitalData(hospitalData);
        } catch (e) {
            console.log('Error while listing hospital data', e);
        }
    }

    return (
        <div>
            <p> hospital List is from DynamoDb is: </p>
            { names.map(name => {
              return (
                  <div>name</div>
              )
            })}
        </div>
    );
}


export { ListHospitals };