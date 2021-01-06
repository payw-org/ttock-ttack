import * as React from "react"
import { render } from "react-dom"
import { Provider } from "react-redux"

import App from "./App"
import configureStore from "./data/configureStore"

const { store, history } = configureStore();

const rootElement = document.getElementById("app")
render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
)