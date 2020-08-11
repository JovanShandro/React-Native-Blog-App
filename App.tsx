import React from "react";
import { createStore, applyMiddleware } from "redux";
import allReducers from "./store/reducers";
import { Provider } from "react-redux";
import Navigator from "./Navigator";
import thunk from "redux-thunk";

const store = createStore(allReducers, applyMiddleware(thunk));

export default function App() {
  return (
    <Provider store={store}>
      <Navigator />
    </Provider>
  );
}
