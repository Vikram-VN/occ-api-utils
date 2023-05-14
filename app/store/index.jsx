import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import appRepository from "./reducers";
import logger from 'redux-logger';
import actions from './actions'


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