import React from "react";
import CartContextComponent from "../../../../Context/CartContextComponent";
import MiniCart from "./MiniCart/MiniCart";
import Currencies from "./Currencies/Currencies";
import classes from "./Actions.css";

class Actions extends React.Component {
  render() {
    return (
      <div className="flex">
        <Currencies />
        <CartContextComponent.Consumer>
          {(cart) => <MiniCart cart={cart} />}
        </CartContextComponent.Consumer>
      </div>
    );
  }
}

export default Actions;
