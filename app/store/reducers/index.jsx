import { combineReducers, createSlice } from "@reduxjs/toolkit";

const initialState = {};

const appRepository = (state = initialState, { type, key, value }) => {
    if (type === "update") {
        return Object.assign({}, state, { [key]: value })
    } else if (type === "remove") {
        const newState = state;
        delete newState[key];
        return newState;
    } else {
        return state;
    }
}


export default appRepository;