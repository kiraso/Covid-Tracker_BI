import React, { useState, useEffect } from 'react';
import './App.css';
import {MenuItem,FormControl,Select, Card, CardContent} from '@material-ui/core'
import  InfoBox from './InfoBox.js'
import Map from './Map'
import Table from './Table'
import { sortData } from './util'
import LineGraph from './LineGraph'
import "leaflet/dist/leaflet.css"
//https://disease.sh/v3/covid-18/countries
function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('worldwide'); 
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData,setTableData] = useState([])
  const [mapCenter,setMapCenter] = useState({ lat: 34.8074, lng: -40.4796})
  const [mapZoom,setMapZoom] = useState(3)
  const [mapCountries,setMapCountries] = useState([])
  
  

  useEffect(() => {
    fetch('https://disease.sh/v3/covid-19/all')
    .then(response => response.json())
    .then(data => {
      setCountryInfo(data)
    })
  },[])

  //STATE = How to wirte a val in REACT

  //https://disease.sh/v3/covid-18/countries

  //USEEFFECT = Runs a piece of code
  //base on a give codition

  useEffect(() => {
      //The code inside here witll run once
      //when the component loads and not again 
      //sycn -> send req wait for it dosometing

      const getCountriesData =  async () => {
        await fetch ('https://disease.sh/v3/covid-19/countries')
        .then( (response) => response.json())
        .then((data) => {
          
          const  countries = data.map((country) => (
            {
              name: country.country, // United States, United Kingdom
              value: country.countryInfo.iso2 // US, UK
            }
          ))
          const sortedData = sortData(data)
          setTableData(sortedData)
          setMapCountries(data)
          setCountries(countries)
        })
      }
      getCountriesData()
  },[])

  const onCountryChange = async (event) => {
    const countryCode = event.target.value
    setCountry(countryCode)

    const url = countryCode === 'Worldwide' ? 'https://disease.sh/v3/covid-19/all' : 
    `https://disease.sh/v3/covid-19/countries/${countryCode}`

    await fetch(url)
    .then(response => response.json())
    .then(data => {
      setCountry(countryCode);
      //all the data from the country response

      setCountryInfo(data);
      setMapCenter([data.countryInfo.lat,data.countryInfo.long])
      setMapZoom(4)
    })
    //https://disease.sh/v3/covid-18/all 
    //https://disease.sh/v3/covid-18/countries/[COUNTRY_CODE]
  }

  console.log('contry info',countryInfo)
  return (
    <div className="App"> 

    <div className="app__left">
       {/* Header */}
    {/* Title + Select input dropdown field */}
          <div className="app__header">
          <h1>COVID-19 ANNIE TRACKING</h1>
          <FormControl className="app__dropdown ">
            <Select
              variant="outlined"
              value={country}
              onChange={onCountryChange}
            >
              <MenuItem value="worldwide">worldwide</MenuItem>
              {
                countries.map(country => (
                  <MenuItem value={country.value}>{country.name}</MenuItem>
                ))
              }
              {/* Loop through all the countries and show a drop down list of the options */}
              {/* <MenuItem value="worldwide">Worldwide</MenuItem>
              <MenuItem value="worldwide">Option2</MenuItem>
              <MenuItem value="worldwide">Option3</MenuItem>
              <MenuItem value="worldwide">Woe</MenuItem> */}
              
            </Select>
          </FormControl>
          </div>
        
        
        <div className="app__stats">
           {/* InfoBoxs */}
          <InfoBox title="Coronavirus Case" 
          cases={countryInfo.todayCases} 
          total={countryInfo.cases}
          />
          <InfoBox title="Recovered" 
          cases={countryInfo.todayRecovered}   
          total={countryInfo.recovered}
          />
          <InfoBox title="Deaths" 
          cases={countryInfo.todayDeaths} 
          total={countryInfo.deaths} 
          />
        </div>
          {/* Map */}
          <Map 
          countries={mapCountries}
          center={mapCenter}
          zoom={mapZoom}
          />
    </div>
   
    <Card className="app__right">
              <CardContent>
                <h3>Live Cases by Country</h3>
                <Table countries={tableData}/>
                <h3>Worldwide new case</h3>
                {/* Graph */}
                <LineGraph />
              </CardContent>
    </Card>
 
         
    </div>
  );
}

export default App;
