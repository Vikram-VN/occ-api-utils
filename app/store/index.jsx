import { configureStore, combineReducers } from "@reduxjs/toolkit";

import { reducer as occReducer } from "./occ-reducer";
import { reducer as userReducer } from "./user-reducer";

const rootReducer = combineReducers({
    occRepository: occReducer,
    userRepository: userReducer,
})

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