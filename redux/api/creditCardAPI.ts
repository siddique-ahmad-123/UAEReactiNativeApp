import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const creditCardAPI = createApi({
  reducerPath: "creditCardApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.EXPO_PUBLIC_API_URL}/api/v1`,
  }),

  endpoints: (builder) => ({
    uaeCreditCard: builder.mutation<any, any>({
      query: (formData) => ({
        url: "ruleExecution/uaeCreditCard",
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
      query: ({ folderName, fileName, mimeType }) => ({
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
    salaryCertificate: builder.mutation<any, any>({
      query: (folderName) => ({
        url: `ocr/salaryCertificate?folderName=${folderName}&customerType=Borrower`,
        method: "POST",
      }),
    }),

    onSubmitApplication: builder.mutation<any, any>({
      query: (formData) => ({
        url: "ruleExecution/uaeCreditCard",
        method: "POST",
        body: formData,
      }),
    }),

    offerLetter: builder.mutation<any, any>({
      query: (formData) => ({
        url: "templateGenerate/offerLetter",
        method: "POST",
        body: formData,
      }),
    }),

    createWorkItem: builder.mutation<any, any>({
      query: (formData) => ({
        url: "workItem/createWorkItem",
        method: "POST",
        body: formData,
      }),
    }),

    getExistingCustomerData: builder.mutation<any, string>({
      query: (mobileNo) => ({
        url: `etb/getExistingCustomerData/${mobileNo}`,
        method: "GET",
      }),
    }),

    getCustomerData: builder.mutation<any, string>({
      query: (mobileNo) => ({
        url: `etb/getCustomerData/${mobileNo}`,
        method: "GET",
      }),
    }),
    getEmiratesDropDownValues: builder.query<any, void>({
      query: () => "getEmiratesDropDownValues"

    }),

     getEmiratesBranchDropDownValues: builder.query<any, void>({
      query: (emirates) => `getBranchDropdownValues/${emirates}`
    }),

    getUser: builder.query<any, void>({
      query: () => "/user",
    }),
  }),
});

export const {
  useUaeCreditCardMutation,
  useFileUploadMutation,
  useFileDeleteMutation,
  useEmiratesIdMutation,
  useVisaMutation,
  usePassportMutation,
  useTradeLicenseMutation,
  useSalaryCertificateMutation,
  useOnSubmitApplicationMutation,
  useGetExistingCustomerDataMutation,
  useCreateWorkItemMutation,
  useGetCustomerDataMutation,
  useGetUserQuery,
  useOfferLetterMutation,
  useGetEmiratesDropDownValuesQuery,
  useGetEmiratesBranchDropDownValuesQuery
} = creditCardAPI;
