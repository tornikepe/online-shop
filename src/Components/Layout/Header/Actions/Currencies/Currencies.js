import React from "react";
import { getData } from "../../../../../Helpers/getData";
import { currenciesQuery } from "../../../../../Helpers/gqlQueries";
import { ClickOutside } from "../../../../UI/ClickOutside";
import CurrencyContext from "../../../../../Context/CurrencyContextComponent";
import CurrencySwitcher from "./CurrencySwitcher/CurrencySwitcher";
import Arrow from "../../../../../images/arrow.svg";
import ErrorIcon from "../../../../UI/ErrorIcon/ErrorIcon";
import classes from "./Currencies.css";

class Currencies extends React.Component {
  static contextType = CurrencyContext;

  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
  }

  clickHandler = () => {
    this.setState({
      show: !this.state.show,
    });
  };

  render() {
    const { show } = this.state;
    const { selectedCurrencySymbol, error } = this.context;

    return (
      <ClickOutside show={show} clickHandler={this.clickHandler}>
        <div className="container" ref={this.wrapper}>
          <div onClick={!error && this.clickHandler}>
            <span className="currencySign">
              {error && <ErrorIcon />}
              {selectedCurrencySymbol}
              <img
                className={`${"arrow"} ${this.state.show ? "arrowUp" : ""}`}
                src={Arrow}
                alt="arrow"
              />
            </span>
          </div>
          {show && (
            <CurrencySwitcher {...this.props} onSelect={this.clickHandler} />
          )}
        </div>
      </ClickOutside>
    );
  }
}

export default getData(Currencies, currenciesQuery);
