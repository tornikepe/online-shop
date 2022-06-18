import React from "react";
import { getData } from "./Helpers/getData";
import { categoriesQuery } from "./Helpers/gqlQueries";
import { Route, Routes, Navigate } from "react-router-dom";
import { withRouter } from "./Helpers/withRouter";
import ProductList from "./Components/Products/ProductList";
import Layout from "./Components/Layout/Layout";
import ProductPage from "./Components/ProductPage/ProductPage";
import CartPage from "./Components/CartPage/CartPage";
import Loader from "./Components/UI/Loader/Loader";
import "./App.css";

class App extends React.Component {
  render() {
    const { data, loading, error } = this.props;

    if (loading) return <Loader />;

    if (error) return <h1 className="error">{error.message}</h1>;

    if (data) {
      return (
        <div className="main-container">
          <Routes>
            <Route
              path="/"
              element={
                <Layout
                  categories={this.props.data.categories.map(
                    (category) => category.name
                  )}
                />
              }
            >
              <Route path="/" element={<ProductList categoryName="all" />} />
              <Route path="/all" element={<Navigate to="/" />} />
              <Route path=":categoryName" element={<ProductList />} />
              <Route path="/products">
                <Route path="" element={<Navigate to="/" />} />
                <Route path=":productId" element={<ProductPage />} />
              </Route>
              <Route path="/cart" element={<CartPage />} />
            </Route>
          </Routes>
        </div>
      );
    }
  }
}

export default withRouter(getData(App, categoriesQuery));
