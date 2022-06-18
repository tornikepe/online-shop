import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import { client } from "./Apollo/client";
import { CurrencyProvider } from "./Context/CurrencyContextComponent";
import { CartProvider } from "./Context/CartContextComponent";

import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ApolloProvider client={client}>
        <CurrencyProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </CurrencyProvider>
      </ApolloProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
