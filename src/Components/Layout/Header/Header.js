import React from "react";
import Navigation from "./Navigation/Navigation";
import Logo from "../../../images/logo.svg";
import Actions from "./Actions/Actions";
import classes from "./Header.css";

class Header extends React.Component {
  render() {
    return (
      <header className="row">
        <Navigation {...this.props} />
        <img src={Logo} className="logo" alt="logo" />
        <Actions />
      </header>
    );
  }
}

export default Header;
