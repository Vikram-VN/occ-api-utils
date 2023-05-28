'use client';
import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import appRepository from './reducers';
import reduxLogger from 'redux-logger';
import actions from './actions';
import { StoreContext } from './context';
import * as utils from '../utils';
import * as crypto from '../utils/crypto';
import * as api from '../utils/api';
import { useToasts } from '../store/hooks';
import { Provider } from 'react-redux';

// Creating saga actions
const sagaMiddleware = createSagaMiddleware();

const middleware = [sagaMiddleware];
process.env.NODE_ENV !== 'production' && middleware.push(reduxLogger);

export function createStore(preloadedState = {}) {
    const store = configureStore({
        reducer: appRepository,
        devTools: process.env.NODE_ENV !== 'production',
        middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }).concat(middleware),
        preloadedState
    });

    sagaMiddleware.run(actions);

    return store;
}

export const store = createStore({});

export function StoreProvider({ children }) {

    const { dispatch } = store;
    const toast = useToasts();

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

    const storeValue = { action, ...api, ...store, ...utils, ...crypto, ...toast };

    return (
        <Provider store={store}>
            <StoreContext.Provider value={storeValue}>
                {children}
            </StoreContext.Provider>
        </Provider>
    );
}
