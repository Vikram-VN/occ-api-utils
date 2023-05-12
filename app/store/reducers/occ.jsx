import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import httpCall from "../../utils/httpCall";
import { data } from "autoprefixer";

const initialState = {};

export const appLogin = createAsyncThunk("login", async (data) => {
  const loginResponse = httpCall('post', '/login', data);
  return loginResponse;
});

export const { actions, reducer } = createSlice({
  name: "occRepository",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(appLogin.fulfilled, (state, action) => {
      Object.assign(state, action.payload);
    });
  },
});

export const selectUser = (state) => state.occ;