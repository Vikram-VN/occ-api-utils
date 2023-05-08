import { combineReducers } from "@reduxjs/toolkit";
import { reducer as occReducer } from "./occ";
import { reducer as userReducer } from "./user";

const rootReducer = combineReducers({
    occRepository: occReducer,
    userRepository: userReducer,
})

export default rootReducer;