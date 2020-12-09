import React from 'react'
import numeral from 'numeral'
import { Circle , Popup} from 'react-leaflet'

const casesTypeColors = {
    cases: {
        hex: '#CC1034',
        // rgb: "rgb(204,16,52)",
        half_op: "rgba(204,16,52,1)",
        multiplier: 800,
    }, 
    recovered:{
        hex: '#7dd71d',
        // rgb: "rgb(125,215,29)",
        half_op: "rgba(125,215,29,1)",
        multiplier: 1200,
    },
    deaths:{
        hex: '#fb4443',
        // rgb: "rgb(251,68,67)",
        half_op: "rgba(251,68,67,1)",
        multiplier: 1400,
    },
}

export const sortData = (data) => {
    const sortedData = [...data];
    sortedData.sort((a,b) => a.cases > b.cases ? -1 : 1)
    return sortedData;
}

//Draw circle on the map
export const showDataOnMap = (data, casesType='cases') => (
  
    data.map((country)=> (
        
        <Circle
        center={[country.countryInfo.lat ,country.countryInfo.long]}
        fillOpacity={0.4}
        color={casesTypeColors[casesType].half_op}
        fillColor={casesTypeColors[casesType].hex}
        radius = {
            Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier
        }
        >
            
            <Popup>
               <img 
               src={country.countryInfo.flag}
                width="50" height="30"
               />
               <div>{country.country}</div>
               <div>Cases: {numeral(country.cases).format("0,0")}</div>
               <div>Recovered: {numeral(country.recovered).format("0,0")}</div>
               <div>Deaths: {numeral(country.deaths).format("0,0")}</div>
              
            </Popup>

        </Circle>

    ))
)