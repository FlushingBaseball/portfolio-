import { useState, useEffect } from "react"

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

export default LineChart