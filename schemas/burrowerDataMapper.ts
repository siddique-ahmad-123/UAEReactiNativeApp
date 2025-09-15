import { fieldNames } from "@/schemas/creditCard/allFieldNames";

// 🔹 maps API response keys → your form field names
export const customerDataMapper: Record<string, string> = {
  Name: fieldNames.borrowerName,
  DOB: fieldNames.borrowerDOB,
  Gender: fieldNames.borrowerGender,
  Nationality: fieldNames.borrowerNationality,
  "Residence Country": fieldNames.borrowerResidenceCountry,

  EIDA_No: fieldNames.borrowerEidaNo,
  EIDA_Issue_Date: fieldNames.borrowerEidaIssueDate,
  EIDA_Expiry_Date: fieldNames.borrowerEidaExpiryDate,

  Passport_No: fieldNames.borrowerPassportNo,
  Passport_Issue_Date: fieldNames.borrowerPassportIssueDate,
  Passport_Expiry_Date: fieldNames.borrowerPassportExpiryDate,

  Visa_No: fieldNames.borrowerVisaNo,
  Visa_Issue_Date: fieldNames.borrowerVisaIssueDate,
  Visa_Expiry_Date: fieldNames.borrowerVisaExpiryDate,

  Email_ID: fieldNames.borrowerEmailId,
  Mobile_No: fieldNames.borrowerMobileNo,

  Address_Line_1: fieldNames.borrowerAddressLine1,
  Address_Line_2: fieldNames.borrowerAddressLine2,
  Emirates: fieldNames.borrowerEmirates,
  Country: fieldNames.borrowerCountry,
};
