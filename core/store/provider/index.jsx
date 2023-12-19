"use client";
import { StoreContext } from "@/store/context";
import * as utils from "@/utils";
import * as crypto from "@/utils/crypto";
import * as api from "@/utils/api";
import { useToasts } from "@/store/hooks";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import WebPage from "@/skeletons/web";
import { store, persistedStore } from "@/store";

// Function to provide the store context to the React app
export default function StoreProvider({ children }) {
  const { dispatch } = store;
  const toast = useToasts();

  // Custom action function for promises
  const action = (type, payload) => {
    return new Promise((resolve, reject) => {
      if (type) {
        return resolve(dispatch({ type, payload }));
      } else {
        return reject(new Error(`Action type is missing from payload`));
      }
    });
  };

  // Store context values
  const storeValue = {
    action,
    ...api,
    ...store,
    ...utils,
    ...crypto,
    ...toast,
  };

  // Providing the store context with Redux Persist
  return (
    <Provider store={store}>
      <PersistGate loading={<WebPage />} persistor={persistedStore}>
        <StoreContext.Provider value={storeValue}>
          {children}
        </StoreContext.Provider>
      </PersistGate>
    </Provider>
  );
}
