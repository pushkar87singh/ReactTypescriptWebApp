import "core-js/stable";
import "regenerator-runtime/runtime";

import React from "react";
import ReactDOM from "react-dom";
import { ApolloProvider } from "@apollo/react-components";
import { ApolloProvider as ApolloHooksProvider } from "@apollo/react-hooks";
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import LocaleContextProvider from "./components/locale-context-provider";
import * as serviceWorker from "./serviceWorker";
import App from "./App";
import theme from "./theme";
import { supportedLocales, defaultLocale } from "./locale";
import { createApolloClient } from "./apollo";

import "./index.css";
import AuthContextProvider from "./components/auth-context-provider";
import StoreContextProvider from "./components/store-context-provider";
import "isomorphic-fetch";
import { LogBoundary } from "./components/log-boundary";

const client = createApolloClient();

const language: string =
  localStorage.getItem("locale") ||
  (navigator.languages && navigator.languages[0]) ||
  navigator.language;

const currentLocale: string = supportedLocales.includes(language)
  ? language
  : defaultLocale;

window.onerror = (err) => {
  console.log(err);
};

ReactDOM.render(
  <ApolloProvider client={client}>
    <ApolloHooksProvider client={client}>
      <ThemeProvider theme={theme}>
        <LogBoundary>
          <LocaleContextProvider locale={currentLocale}>
            <AuthContextProvider
              apolloCache={client.cache}
              currentLocale={currentLocale}
            >
              <StoreContextProvider>
                <App />
              </StoreContextProvider>
            </AuthContextProvider>
          </LocaleContextProvider>
        </LogBoundary>
      </ThemeProvider>
    </ApolloHooksProvider>
  </ApolloProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
