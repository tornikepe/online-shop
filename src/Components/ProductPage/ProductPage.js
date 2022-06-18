import React from "react";
import { withRouter } from "../../Helpers/withRouter";
import { getProduct } from "../../Helpers/getProduct";
import { productQuery } from "../../Helpers/gqlQueries";
import CurrencyContext from "../../Context/CurrencyContextComponent";
import CartContextComponent from "../../Context/CartContextComponent";
import Loader from "../UI/Loader/Loader";
import ProductGallery from "./ProductGallery/ProductGallery";
import ProductInfo from "./ProductInfo/ProductInfo";
import classes from "./ProductPage.module.css";

class ProductPage extends React.Component {
  render() {
    const { data, loading, error } = this.props;

    if (loading) return <Loader />;

    if (error) {
      return <h1 className="error-message">{error.message}</h1>;
    }

    if (data) {
      const { product } = data;

      if (!product) return <h1 className="error-message">Product not found</h1>;

      return (
        <div className={classes.container}>
          <ProductGallery product={product} />
          <CurrencyContext.Consumer>
            {(currency) => (
              <CartContextComponent.Consumer>
                {(cart) => (
                  <ProductInfo
                    currency={currency}
                    cart={cart}
                    product={product}
                  />
                )}
              </CartContextComponent.Consumer>
            )}
          </CurrencyContext.Consumer>
        </div>
      );
    }
  }
}

export default withRouter(getProduct(ProductPage, productQuery));
