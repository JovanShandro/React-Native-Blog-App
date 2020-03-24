import React from "react";
import { createStore } from "redux";
import allReducers from "./store/reducers";
import { Provider } from "react-redux";
import Navigator from "./Navigator";

const store = createStore(allReducers);

export default function App() {
  return (
    <Provider store={store}>
      <Navigator />
    </Provider>
  );
}
