import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const creditCardAPI = createApi({
  reducerPath: "creditCardApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://10.232.119.245:8080/api/v1" }),
  endpoints: (builder) => ({
    userEligibilityCheck: builder.mutation<any, any>({
      query: (formData) => ({
        url: "ruleExecution/userEligibilityCheck",
        method: "POST",
        body: formData,
      }),
    }),
    fileUpload: builder.mutation<any, any>({
      query: (formData) => ({
        url: "uploadDocInFolder/fileUpload",
        method: "POST",
        body: formData,
      }),
    }),
    getUser: builder.query<any, void>({
      query: () => "/user",
    }),
  }),
});

export const { useUserEligibilityCheckMutation, useGetUserQuery,useFileUploadMutation } = creditCardAPI;
