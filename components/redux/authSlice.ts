import { UserDataInterface } from "../interfaces";
import { api } from "./api";
import { createSlice } from "@reduxjs/toolkit";
import { authApi } from "./apis/authApi";
import { useSelector } from "react-redux";
import { RootState } from "./store";
import { storeRefreshToken } from "../cred";

const initialState = {
  accessToken: "",
  isLogin: false,
  isPageLoading: true,
  data: {} as UserDataInterface,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      (state, { payload }) => {
        state.accessToken = payload.accessToken || "";
        state.data = payload.credentials as UserDataInterface;
        state.isLogin = true;
        state.isPageLoading = false;
        storeRefreshToken("refreshToken", payload.refreshToken || "");
      }
    );
    builder.addMatcher(
      authApi.endpoints.refreshToken.matchFulfilled,
      (state, { payload }) => {
        state.accessToken = payload.accessToken || "";
        state.data = payload.credentials as UserDataInterface;
        state.isLogin = true;
        state.isPageLoading = false;
        // storeRefreshToken("refreshToken", payload.refreshToken || "");
      }
    );
  },
});

export const useAuth = () => {
  return useSelector((state: RootState) => state.auth);
};
