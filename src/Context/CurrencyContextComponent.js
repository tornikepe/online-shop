import React from "react";
import { client } from "../Apollo/client";
import { currenciesQuery } from "../Helpers/gqlQueries";

const CurrencyContextComponent = React.createContext();

export class CurrencyProvider extends React.Component {
  state = {
    selectedCurrency: null,
    selectedCurrencySymbol: null,
  };

  componentDidMount() {
    client.query({ query: currenciesQuery }).then((resp) => {
      if (!localStorage.getItem("currency")) {
        const currency = resp.data.currencies[0];
        this.setState({
          selectedCurrency: currency.label,
          selectedCurrencySymbol: currency.symbol,
        });
      } else {
        const currency = this.getLocalStorage();
        this.setState({
          selectedCurrency: currency.label,
          selectedCurrencySymbol: currency.symbol,
        });
      }
    });
  }

  getLocalStorage = () => {
    return JSON.parse(localStorage.getItem("currency"));
  };

  setLocalStorage = (currency) => {
    localStorage.setItem(
      "currency",
      JSON.stringify({
        label: currency.label,
        symbol: currency.symbol,
      })
    );
  };

  onSelectCurrency = (currency) => {
    this.setLocalStorage(currency);
    this.setState({
      selectedCurrency: currency.label,
      selectedCurrencySymbol: currency.symbol,
    });
  };

  render() {
    return (
      <CurrencyContextComponent.Provider
        value={{ ...this.state, selectCurrency: this.onSelectCurrency }}
      >
        {this.props.children}
      </CurrencyContextComponent.Provider>
    );
  }
}

export default CurrencyContextComponent;
