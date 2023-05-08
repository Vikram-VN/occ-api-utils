import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers";

export function createStore(preloadedState = {}) {
    const store = configureStore({
        reducer: {
            appRepository: rootReducer,
        },
        preloadedState
    });

    return store;
}

const store = createStore({});
export default store;