"use client";
import { Provider } from "react-redux";
import { createStore } from "./index";
import { StoreContext } from "./context";
import * as utils from "../utils";
import * as crypto from "../utils/crypto";
import httpCall from "../utils/httpCall";

export function StoreProvider({ children, preloadedState = {} }) {
  const store = createStore(preloadedState);
  const { dispatch: action } = store;
  const storeValue = { ...store, ...utils, httpCall, ...crypto, action };

  return (
    <Provider store={store}>
      <StoreContext.Provider value={storeValue}>
        {children}
      </StoreContext.Provider>
    </Provider>
  );
}