import { configureStore } from "@reduxjs/toolkit";

import { reducer as occReducer } from "./occ-reducer";
import { reducer as userReducer } from "./user-reducer";

export function createStore(preloadedState = {}) {
    const store = configureStore({
        reducer: {
            occRepository: occReducer,
            userRepository: userReducer,
        },
        preloadedState,
    });

    return store;
}
const store = createStore({});
export default store;