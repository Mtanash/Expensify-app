import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import AppRouter from "./routers/AppRouter";
import configureStore from "./store/configureStore";
import { addExpense } from "./actions/expenses";
import { setTextFilter } from "./actions/filters";
import getVisibleExpenses from "./selectors/expenses";

import "normalize.css/normalize.css";
import "./styles/styles.scss";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";

const store = configureStore();
store.dispatch(
  addExpense({ description: "Water bill", amount: 60, createdAt: 400 })
);
store.dispatch(
  addExpense({ description: "Gas bill", amount: 100, createdAt: 300 })
);
store.dispatch(
  addExpense({ description: "rent bill", amount: 10, createdAt: 200 })
);

console.log(
  getVisibleExpenses(store.getState().expenses, store.getState().filters)
);

ReactDOM.render(
  <Provider store={store}>
    <AppRouter />
  </Provider>,
  document.getElementById("app")
);
