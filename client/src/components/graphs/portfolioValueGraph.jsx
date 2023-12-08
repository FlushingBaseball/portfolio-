import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts/highstock";
import { useState, useEffect } from "react";
import loading from "../../assets/loading.svg";

export default function PortfolioValueGraph({ data, data2, name, name2 }) {
  const [chartOptions, setChartOptions] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [inData, setInData] = useState(data);
  const [inData2, setInData2] = useState(data2);
  const [portfolioName, setPortfolioName] = useState(name);
  const [portfolioName2, setPortfolioName2] = useState(name2);

  let name = `${portfolioName} Value`;
  let chartData = [];
  let chartData2 = [];

  useEffect(() => {}, []);

  Object.keys(inData).forEach((date) => {
    chartData.push([Date.parse(date), inData[date]["close"]]);
  });

  if (inData2 !== null) {
    Object.keys(inData2).forEach((key) => {
      chartData2.push([Date.parse(key), inData2[key]["close"]]);
    });
    name = `${portfolioName} vs. ${portfolioName2}`;
  }

  chartData = chartData.reverse();
  chartData2 = chartData2.reverse();

  const updatedChartOptions = {
    rangeSelector: {
      selected: 0,
      buttons: [
        { type: "month", count: 1, text: "1m" },
        { type: "month", count: 3, text: "3m" },
        { type: "month", count: 6, text: "6m" },
        { type: "year", count: 1, text: "1y" },
        { type: "all", text: "All" },
      ],
    },
    title: { text: name },
    subtitle: { text: "Price based on closing price per timeframe" },
    plotOption: {
      series: {
        compare: "price",
        showInNavigator: true,
      },
    },
    tooltip: {
      valueDecimals: 2,
      split: true,
    },
    series: [
      { name: `${portfolioName}`, data: chartData, id: "chart1" },
      { name: `${portfolioName2}`, data: chartData2, id: "chart2" },
    ],
    responsive: {
      rules: [
        {
          condition: { maxWidth: 500 },
          chartOptions: {
            chart: { height: 300 },
            subtitle: { text: null },
            navigator: { enabled: false },
          },
        },
      ],
    },
  };

  setChartOptions(updatedChartOptions);
  setIsLoading(false);

  return (
    <div className="chart">
      {isLoading ? (
        <img src={loading} alt="Loading..." className="isLoading" />
      ) : (
        <HighchartsReact
          highcharts={Highcharts}
          constructorType={"stockChart"}
          options={chartOptions}
        />
      )}
    </div>
  );
}
