import { useState, useEffect } from "react"
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts/highstock';
import axios from 'axios';
import loading from '/assets/loading.svg'

const [isLoading, setIsLoading] = useState(true);
const [chartOptions, setChartOptions] = useState({});
//callsFlag needs to be state again

//will take in any other state I don't remember the charts taking
// The component must be pasted a calltype, a symbol, and either a startDate/endDate, or minutes/days
// Line chart component currently only supports intraday and history api calls to stocks

function LineChart ({symbol}) {

    // useEffect(()=>{
    //   getStockData()
    // },[symbol])


    // Highcharts/Highstocks needs data in an array format instead of an object
    // So, data is converted to array here
getStockData = async(symbol) =>{
  const chartData =[];
  axios.get(`/api/alpha/daily/${symbol}`)
  .then((res) => {
    const {data} = res;
    if (data.Note ===null || data.Note === undefined){
      Object.keys(data).forEach(count => {
        chartData.push([data[count].UTC, data[count].adjustedClose]);
      })
   }
   else {
    console.error(data.Note);
    setIsLoading(false)
    setCallsFlag(true)
   }
   setIsLoading(false)
   setChartOptions(
    {
      rangeSelector: {
        selected : 0,
        buttons : [
          {
            type : 'month',
            count : 1,
            text : '1m'
          }, 
          {
            type : 'month',
            count : 3,
            text : '3m'
          }, 
          {
            type : 'month',
            count : 6,
            text : '6m'
          }, 
          {
            type : 'year',
            count : 1,
            text : '1y'
          }, 
          {
            type : 'all',
            text : 'All'
          }
        ],
      },
      title: { text: `${symbol} Price`, },
      subtitle: { text: 'Price based on closing price per timeframe' },
      series : [
        {
          name : symbol,
          data : chartData,
          tooltip : { valueDecimals: 2 }
        }
      ],
      responsive : {
        rules : [{
          condition : {  maxWidth : 500 },
          chartOptions : {
            chart : {
                height : 300
            },
            subtitle : {
                text : null
            },
            navigator : {
                enabled : false
            }
          }
        }]
      }
    }
   )
  })
  .catch(console.error);
}







return (
  <div className="chart">
    { isLoading ?
    <img src={loaidng} alt="loading..." className="isLoading" />
    : <HighChartsReact
    highcharts ={Highcharts}
    constructorType={'stockChart'}
    options={chartOptions}
    />
    }
    { callsFlag ?
          <h1 style={ style.callsFlag }>Too many calls at once</h1>
          : null
        }
  </div>
)

}
export default LineChart