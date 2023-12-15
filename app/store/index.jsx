"use client";
import { useRef } from "react";
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

// Creating saga actions
const sagaMiddleware = createSagaMiddleware();

const middleware = [sagaMiddleware];
process.env.NODE_ENV !== "production" && middleware.push(reduxLogger);

export function createStore(rootReducer) {
  const store = configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== "production",
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: false }).concat(middleware),
    preloadedState: {
      occRepository: {
        instanceId: null,
        accessToken: null,
        appKey: null,
      },
    },
  });

  sagaMiddleware.run(actions);

  return store;
}

export const store = createStore(appRepository);

export function StoreProvider({ children }) {
  const storeRef = useRef(null);
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = store;
  }

  const { dispatch } = storeRef.current;
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
    ...storeRef.current,
    ...utils,
    ...crypto,
    ...toast,
    useSelector,
  };

  return (
    <Provider store={storeRef.current}>
      <StoreContext.Provider value={storeValue}>
        {children}
      </StoreContext.Provider>
    </Provider>
  );
}
