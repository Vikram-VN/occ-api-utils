import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {};

export const fetchUser = createAsyncThunk("user/fetchUser", async () => {
  return Promise.resolve({ id: 1, name: "John Doe" });
});

export const { actions, reducer } = createSlice({
  name: "userRepository",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.user = action.payload;
    });
  },
});

export const selectUser = (state) => state.user;