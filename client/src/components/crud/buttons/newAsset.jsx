import colors from "../../../assets/colors";
import Popup from "reactjs-popup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
// import TextField from '@material'
import axios from "axios";
import { stringigy as queryStringify } from "query-string";

import { useState } from "react";

function NewAsset() {
  const [state, setState] = useState({
    //stock
    symbol: "",
    shares: "",
    purchasedAt: "",
    requesting: false,
  });

  const onSubmit = async (close) => {
    e.preventDefault();
    setState({ ...state, requesting: true });

    const { symbol, shares, purchasedAt } = state;

    const body = { symbol, shares, purchasedAt };

    await createAsset(body);

    setState({ ...state, requesting: false });
    close();
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };


  const searchStocks = async (e, val) => {
    if (val){
      let 
        queryString = queryStringify({q : val}),
        stocks = await axios.get(`/api/search/stock?${queryString}`)
        .then((res)=> res.data.results);
      stocks = stocks.map((stock) => stock.symbol);
      setState({stocks, symbol : val.toUpperCase() }); 
    }
  }

  // Old inline style switch to emotion or styled componets after projected hosted again
  style = {
    icon : {
      color : colors.blue,
      cursor : 'pointer'
    },
    popup : {
      border : 'none',
      boxShadow : 'none',
      padding : '0'
    },
    newForm : {
      backgroundColor : colors.darkBlue,
      padding : '20px',
      boxSizing: 'border-box',
      width : '100%',
      height : '100%',
      outline : 'none',
      color : 'white'
    },
    search : {
      width : '300px',
      backgroundColor : 'white',
      color : 'white',
      fontFamily : 'Comfortaa',
      margin : '0 auto'
    }
  }

  return (
    //const style = this.style;
    <Popup
      trigger={
        <FontAwesomeIcon style={style.icon} icon={faPlus}></FontAwesomeIcon>
      }
      style={style.popup}
      modal>
        { close => (
            <div style={ style.newForm } >
            <i className="fas fa sign"></i>
            <h2>Add a New Asset</h2>
            <br/>
            <form onSubmit={ this.onSubmit(close) }>
              <div className="form-control">
                <label htmlFor="symbol">Symbol</label>
                <Autocomplete
                  clearOnEscape
                  inputValue={ symbol }
                  onInputChange={ this.searchStocks }
                  options={ stocks }
                  getOptionLabel={ option => option.symbol ? option.symbol : option }
                  style={ style.search }
                  renderInput={ params => (
                    <TextField { ...params } label="Search Stocks..." variant="outlined" fullWidth required/>
                  )}
                />
              </div>
              <div className="form-control">
                <label htmlFor="shares">Shares</label>
                <input type="number" onChange={ this.onChange } name="shares" placeholder="Shares" value={ shares } required />
              </div> 
              <div className="form-control">
                <label htmlFor="purchasedAt">Purchased At</label>
                <input type="date" onChange={ this.onChange } min="2015-01-01" name="purchasedAt" value={ purchasedAt } required/>
              </div> 
              <div className="form-control">
                <input type="submit" value="Create" disabled={ requesting }/>
                { requesting &&
                  <img 
                    style={ {float : 'right'} }
                    src={ process.env.PUBLIC_URL + '/animations/loading-gear.svg' } 
                    alt="loading" >
                  </img>
                }
              </div>
            </form>
          </div>
          )}
      </Popup>
  )
}

export default NewAsset;

