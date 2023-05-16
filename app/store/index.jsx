"use client";
import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import appRepository from "./reducers";
import logger from 'redux-logger';
import actions from './actions';
import { Provider } from "react-redux";
import { StoreContext } from "./context";
import * as utils from "../utils";
import * as crypto from "../utils/crypto";
import httpCall from "../utils/httpCall";

// Creating saga actions
const sagaMiddleware = createSagaMiddleware();

const middleware = [sagaMiddleware];
process.env.NODE_ENV !== 'production' && middleware.push(logger);

export function createStore(preloadedState = {}) {
    const store = configureStore({
        reducer: { appRepository },
        devTools: process.env.NODE_ENV !== 'production',
        middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }).concat(middleware),
        preloadedState
    });
    sagaMiddleware.run(actions);

    return store;
}


export function StoreProvider({ children, preloadedState = {} }) {

    const store = createStore(preloadedState);
    const { dispatch } = store;

    const action = (type, payload) => {
        new Promise((resolve, reject) => {
            if (type) {
                resolve(dispatch({ type, payload }));
            }
            else {
                reject(new Error(`Action type is missing from payload`))
            }

        });
    };

    const storeValue = { httpCall, action, ...store, ...utils, ...crypto };

    return (
        <Provider store={store}>
            <StoreContext.Provider value={storeValue}>
                {children}
            </StoreContext.Provider>
        </Provider>
    );
}
