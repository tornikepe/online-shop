import React from "react";
import { createContext } from "react";

const CartContextComponent = createContext();

export class CartProvider extends React.Component {
  item = localStorage.getItem("item")
    ? JSON.parse(localStorage.getItem("item"))
    : [];

  state = {
    products: this.item,
    totalAmount: 0,
  };

  addItem = (productObj) => {
    const existingItemsIndex = this.state.products.findIndex(
      (item) =>
        item.id === productObj.id &&
        item.attributesId === productObj.attributesId
    );
    const existingItem = this.state.products[existingItemsIndex];
    let updatedCart;

    if (existingItem) {
      existingItem.amount++;
      updatedCart = this.state.products;
      this.setState({ products: updatedCart });
      localStorage.setItem("item", JSON.stringify(updatedCart));
    } else {
      updatedCart = [...this.state.products, { ...productObj, amount: 1 }];
      this.setState({ products: updatedCart });
      localStorage.setItem("item", JSON.stringify(updatedCart));
    }

    const itemAmount = this.calculateItemTotalAmount(updatedCart);
    this.setState({ totalAmount: itemAmount });
  };

  removeItem = (productObj) => {
    const existingItemsIndex = this.state.products.findIndex(
      (item) =>
        item.id === productObj.id &&
        item.attributesId === productObj.attributesId
    );
    const existingItem = this.state.products[existingItemsIndex];
    let updatedCart;

    if (existingItem.amount > 1) {
      existingItem.amount--;
      updatedCart = this.state.products;
      this.setState({ products: updatedCart });
      localStorage.setItem("item", JSON.stringify(updatedCart));
    } else {
      updatedCart = this.state.products.filter(
        (item) =>
          item.id !== productObj.id ||
          item.attributesId !== productObj.attributesId
      );
      this.setState({ products: updatedCart });
      localStorage.setItem("item", JSON.stringify(updatedCart));
    }

    const itemAmount = this.calculateItemTotalAmount(updatedCart);
    this.setState({ totalAmount: itemAmount });
  };

  calculateItemTotalAmount = (updatedCart) => {
    let itemAmount = 0;
    updatedCart.forEach((item) => {
      itemAmount += item.amount;
    });
    return itemAmount;
  };
  componentDidMount() {
    const itemAmount = this.calculateItemTotalAmount(this.item);
    this.setState({ totalAmount: itemAmount });
  }
  render() {
    return (
      <CartContextComponent.Provider
        value={{
          ...this.state,
          addToCart: this.addItem,
          removeFromCart: this.removeItem,
        }}
      >
        {this.props.children}
      </CartContextComponent.Provider>
    );
  }
}

export default CartContextComponent;
