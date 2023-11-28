import HighLowChart from ".highlowChart";
import LineChart from './lineGraph';
import Piechart from './pieGraph';

export default function Graphs ({symbol, setSymbol}){

  setSymbol('APPL')


  return(
    <div className="WrapperGraphList">
      <HighLowChart symbol={symbol} />
      <LineChart symbol={symbol} />
      <Piechart
        slices = {
          [
            {
              name: 'GE',
              y: 45.4
            },
            {
              name: 'AAPL' ,
              y: 34.6
            },
            {
              name: "AMD" ,
              y: 12.5
            },
            {
              name: 'AMC',
              y: 7.5
            },
          ]
        } 
      />
    </div>
  )
}