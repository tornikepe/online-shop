import React from "react";
import CartContextComponent from "../../Context/CartContextComponent";
import CurrencyContext from "../../Context/CurrencyContextComponent";
import Cart from "../UI/Cart/Cart";

class CartPage extends React.Component {
  render() {
    return (
      <div>
        <h1 className="Cart" style={{ marginBottom: "60px" }}>
          CART
        </h1>
        <CurrencyContext.Consumer>
          {(currency) => (
            <CartContextComponent.Consumer>
              {(cart) => <Cart currency={currency} cart={cart} />}
            </CartContextComponent.Consumer>
          )}
        </CurrencyContext.Consumer>
      </div>
    );
  }
}

export default CartPage;
