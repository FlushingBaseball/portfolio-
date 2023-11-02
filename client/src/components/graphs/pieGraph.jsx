import { useState, useEffect } from "react"
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts/highstock';


// Pie Chart for portfolios 
// Get passed a slices prop
// Slices holds a an array of objects that have two attributes:
// name - which is a string name for that slice
// y - which is the percent of the pie chart that slice will be
// NOTE: This may change when portfolios are tied into an api endpoint

function PieChart({data, portfolioName}){
  const [metric, setMetric] = useState('value');
  const [chartOptions, setChartOptions] = useState({});


  useEffect(()=>{

    if (portfolioName === "null(null)") portfolioName = "";
    
    setChartOptions({
      chart : {
        plotShadow: false,
        type: 'pie',
      },
      title : { text: portfolioName },
      tooltip : { pointFormat : '{series.name}: <b>{point.percentage:.1f}%</b>' },
      plotOptions : {
        pie : {
          allowPointSelect : true,
          cursor : 'pointer',
          dataLabels : {
            enabled : true,
            format : '<b>{point.name}</b>: {point.percentage:.1f} %'
          }
        }
      },
      series : [{
        colorByPoint : true,
        data : data[metric]
      }],

    })



  },[data, metric])

  return (
    <div>
      <HighchartsReact
        highcharts={ Highcharts }
        options={ chartOptions }
      />
    </div>

  )
}
export default PieChart;