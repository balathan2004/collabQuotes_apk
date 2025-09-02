// api/authApi.ts

import { api } from "../api";
import { AuthResponseConfig } from "@/components/interfaces";

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<
      AuthResponseConfig,
      { email: string; password: string }
    >({
      query: (body) => ({
        url: "auth/login",
        method: "POST",
        body,
      }),
    }),
    register: builder.mutation<
      AuthResponseConfig,
      { email: string; password: string }
    >({
      query: (body) => ({
        url: "auth/register",
        method: "POST",
        body,
      }),
    }),
    refreshToken: builder.query<AuthResponseConfig, string>({
      query: (id) => {
        return {
          url: `auth/refresh/${id}`,
          method: "GET",
        };
      },
    }),
  }),
  overrideExisting: false, // keep other endpoints safe
});

export const { useLoginMutation ,useRefreshTokenQuery,useLazyRefreshTokenQuery} = authApi;
