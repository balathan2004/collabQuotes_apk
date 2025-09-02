import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "./store";

// Define a service using a base URL and expected endpoints

const url = "https://collab-quotes-server.vercel.app/";

const rawBaseQuery = fetchBaseQuery({
  baseUrl: url,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const state = getState() as RootState;
    const token = state.auth.accessToken;

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

export const api = createApi({
  reducerPath: "api",
  baseQuery: rawBaseQuery,
  endpoints: (build) => ({}),
});
