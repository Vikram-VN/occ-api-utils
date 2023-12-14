"use client";
import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import appRepository from "@/store/reducers";
import reduxLogger from "redux-logger";
import actions from "@/store/actions";
import { StoreContext } from "@/store/context";
import * as utils from "@/utils";
import * as crypto from "@/utils/crypto";
import * as api from "@/utils/api";
import { useToasts } from "@/store/hooks";
import { Provider, useSelector } from "react-redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { PersistGate } from "redux-persist/integration/react";

// Creating saga actions
const sagaMiddleware = createSagaMiddleware();

const middleware = [sagaMiddleware];
process.env.NODE_ENV !== "production" && middleware.push(reduxLogger);

export function createStore(persistedReducer) {
  const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== "production",
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: false }).concat(middleware),
  });

  sagaMiddleware.run(actions);

  return store;
}

const persistConfig = {
  version: 1,
  key: "occStore",
  debug: false,
  storage,
};

const persistedReducer = persistReducer(persistConfig, appRepository);

export const store = createStore(persistedReducer);
export const persistor = persistStore(store);

export function StoreProvider({ children }) {
  const { dispatch } = store;
  const toast = useToasts();
  store.useSelector = useSelector;

  const action = (type, payload) => {
    return new Promise((resolve, reject) => {
      if (type) {
        return resolve(dispatch({ type, payload }));
      } else {
        return reject(new Error(`Action type is missing from payload`));
      }
    });
  };

  const storeValue = {
    action,
    ...api,
    ...store,
    ...utils,
    ...crypto,
    ...toast,
    useSelector,
  };

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <StoreContext.Provider value={storeValue}>
          {children}
        </StoreContext.Provider>
      </PersistGate>
    </Provider>
  );
}
