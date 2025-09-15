import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const creditCardAPI = createApi({
  reducerPath: "creditCardApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080/api/v1" }),
  endpoints: (builder) => ({
    userEligibilityCheck: builder.mutation<any, any>({
      query: (formData) => ({
        url: "ruleExecution/userEligibilityCheck",
        method: "POST",
        body: formData,
      }),
    }),

    onSubmitApplication: builder.mutation<any, any>({
      query: (formData) => ({
        url: "ruleExecution/uaeCreditCard",
        method: "POST",
        body: formData,
      }),
    }),
    getExistingCustomerData: builder.query<any, string>({
  query: (mobileNo) => `etb/getExistingCustomerData/${mobileNo}`,
}),

    
    getUser: builder.query<any, void>({
      query: () => "/user",
    }),
  }),
});

export const { useUserEligibilityCheckMutation, useGetUserQuery,useGetExistingCustomerDataQuery} = creditCardAPI;
