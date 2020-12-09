import React, { useState, useEffect } from 'react'
import { Line } from 'react-chartjs-2'
import numeral from 'numeral'
import './LineGraph.css'

const options ={
    legend:{
        display: false
    },
    elements:{
        point:{
            radius: 0
        }
    },
    maintainaAspectRatio: false,
    tooltips:{
        mode: 'index',
        intersect: false,
        callbacks: {
            label: function (tootltipItem, data){
                return numeral(tootltipItem.value).format("+0,0")
            }
        }
    },
    scales:{
        xAxes:[
            {
                type:"time",
                time:{
                    format:"MM/DD/YY",
                    tooltipFormat: 'll'
                }
            }
        ],
        yAxes:[
            {
               gridLines:{
                   display: false,
               },
               ticks:{
                    callback: function(value, index, values){
                        return numeral(value).format("0aa")
                    }
                }
            }
           
        ]
    }
 


}

const buildChartData  = (data,casesType='cases') => {
    const chartData = [];
    let lastDataPoint;

    for(let date in data.cases){
        if(lastDataPoint){
            const newDataPoint = {
                x: date,
                y: data[casesType][date]-lastDataPoint
            }
            chartData.push(newDataPoint)
        }
        
        lastDataPoint = data[casesType][date]
    }
    return chartData;
}

function LineGraph() {
    const [data,setData] = useState({})
    //https://disease.sh/v3/covid-19/historical/all?lastdays=120
   
    useEffect(() => {
        const fecthData = async () =>{
          await  fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=120')
            .then(response => response.json())
            .then(data =>{
                let chartData = buildChartData(data,'cases')
                setData(chartData)
            })
        };

        fecthData();
       
    }, [])
 
    return (
        <div className="LineCard__box">
           
            {data?.length > 0 && (
                 <Line
                 options = {options}
                 
                 data={
                     {
                         datasets: [
                             {   
                                 backgroundColor: 'rgba(204,16,52,0.5)',
                                 borderColor: '#CC1034',
                                 data: data,
                             }
                         ]
                     }
                 }
                
             />
            )}
           
        </div>
    )
}

export default LineGraph
