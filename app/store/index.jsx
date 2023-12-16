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
import { Provider } from "react-redux";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { PersistGate } from "redux-persist/integration/react";
import WebPage from "@/skeletons/web";

// Creating saga actions
const sagaMiddleware = createSagaMiddleware();

// Middleware configuration
const middleware = [sagaMiddleware];
process.env.NODE_ENV !== "production" && middleware.push(reduxLogger);

// Function to create the Redux store
export function createStore(persistedReducer) {
  const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== "production",
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
          ignoredActionPaths: [
            "payload.onError",
            "payload.stateHandler",
            "payload.onSuccess",
          ],
        },
      }).concat(middleware),
  });

  // Running sagas
  sagaMiddleware.run(actions);

  return store;
}

// Redux persist configuration
const persistConfig = {
  version: 1,
  key: "occStore",
  debug: false,
  storage,
};

// Creating persisted reducer
const persistedReducer = persistReducer(persistConfig, appRepository);

// Creating the Redux store and persisted store
export const store = createStore(persistedReducer);
export const persistedStore = persistStore(store);

// Function to provide the store context to the React app
export function StoreProvider({ children }) {
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
