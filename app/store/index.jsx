'use client';
import { configureStore } from '@reduxjs/toolkit';
import { PersistGate } from 'redux-persist/integration/react';
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducers';
import logger from 'redux-logger';
import actions from './actions';
import { Provider } from 'react-redux';
import { persistStore, persistReducer } from 'redux-persist';
import { StoreContext } from './context';
import * as utils from '../utils';
import * as crypto from '../utils/crypto';
import * as api from '../utils/httpCall';
import { useToasts } from '../store/hooks';

// Creating saga actions
const sagaMiddleware = createSagaMiddleware();

const middleware = [sagaMiddleware];
process.env.NODE_ENV !== 'production' && middleware.push(logger);


const createNoopStorage = () => {
    return {
        getItem(_key) {
            return Promise.resolve(null);
        },
        setItem(_key, value) {
            return Promise.resolve(value);
        },
        removeItem(_key) {
            return Promise.resolve();
        },
    };
};


const storage = typeof window !== 'undefined' ? createWebStorage('local') : createNoopStorage();

const persistConfig = {
    key: 'apexStore',
    version: 1,
    storage,
}

export const appRepository = persistReducer(persistConfig, rootReducer);

export function createStore(preloadedState = {}) {
    const store = configureStore({
        reducer: rootReducer,
        devTools: process.env.NODE_ENV !== 'production',
        middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }).concat(middleware),
        preloadedState
    });

    const persistedStore = persistStore(store)
    sagaMiddleware.run(actions);

    return { store, persistedStore };
}

export const { store, persistedStore } = createStore({});

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
            {/* <PersistGate loading={null} persistor={persistedStore}> */}
            <StoreContext.Provider value={storeValue}>
                {children}
            </StoreContext.Provider>
            {/* </PersistGate> */}
        </Provider>
    );
}
