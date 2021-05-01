
import { render } from '@testing-library/react';
import React, { Component } from 'react';
import './SearchBar.css';
import cityList from './cities.json'

class SearchBar extends Component {
    state = {
        searchCity : ""
    }

    setSearchCity = e =>{
        this.setState({ searchCity: e.target.value });
    } 

    renderCity  = (city,key) =>{
        return( 
            <div className="citylist" key={key}>
            <p className="citytext">
                {city.name}
            </p>
           
        </div>

        );
          
       // var code = city.code.toLowerCase()

        /*if( search !== "" && country.name.toLowerCase().indexOf( search.toLowerCase() ) === -1 ){
            return null
        }*/
    }

    render() {
        const {searchCity} = this.state;
        const filteredCities = cityList.filter(city => {
            if (searchCity == "") {
                return ""
            } else if (city.name.toLowerCase().includes(searchCity.toLowerCase() )) {
                   return city       
            }
        })
        return (
            <div className="searchbar-root">
                <div className="searchbar-container" >
                    <input type="text" 
                    placeholder="Search city.. " 
                    onChange={this.setSearchCity}
                    />
                    {filteredCities.map((city,key) => this.renderCity(city,key))}
                </div>
                
            </div>
        );

    }
}

export default SearchBar;