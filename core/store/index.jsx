import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import appRepository from "@/store/reducers";
import reduxLogger from "redux-logger";
import actions from "@/store/actions";
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

export default store;
