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
    fileDelete: builder.mutation<any, any>({
      query: ({folderName,fileName,mimeType}) => ({
        url: `uploadDocInFolder/fileDelete?folderName=${folderName}&fileName=${fileName}&mimeType=${mimeType}`,
        method: "DELETE",
      }),
    }),
    emiratesId: builder.mutation<any, any>({
      query: (folderName) => ({
        url: `ocr/emiratesId?folderName=${folderName}&customerType=Borrower`,
        method: "POST",
      }),
    }),
    visa: builder.mutation<any, any>({
      query: (folderName) => ({
        url: `ocr/visa?folderName=${folderName}&customerType=Borrower`,
        method: "POST",
      }),
    }),
    passport: builder.mutation<any, any>({
      query: (folderName) => ({
        url: `ocr/passport?folderName=${folderName}&customerType=Borrower`,
        method: "POST",
      }),
    }),
    tradeLicense: builder.mutation<any, any>({
      query: (folderName) => ({
        url: `ocr/tradeLicense?folderName=${folderName}&customerType=Borrower`,
        method: "POST",
      }),
    }),
    getUser: builder.query<any, void>({
      query: () => "/user",
    }),
  }),
});

export const { useUserEligibilityCheckMutation, useGetUserQuery,useFileUploadMutation,useFileDeleteMutation,useEmiratesIdMutation,useVisaMutation,usePassportMutation,useTradeLicenseMutation } = creditCardAPI;
