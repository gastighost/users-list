import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { UserType } from "../../types/users";
import api from "../../common/api";

interface UsersInitialState {
  users: UserType[];
  maxPage: number;
}

const initialState: UsersInitialState = {
  users: [],
  maxPage: 0,
};

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (page: number) => {
    const response = await api.getUsers(page);
    return response.data;
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.users = [...state.users, ...action.payload.data];
      state.maxPage = action.payload.total_pages;
    });
  },
});

export default usersSlice.reducer;
