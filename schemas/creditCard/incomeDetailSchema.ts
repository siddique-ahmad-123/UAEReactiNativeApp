import { z } from "zod";
const alphaNum = z.string().regex(/^[A-Za-z0-9]+$/, {
  message: "Only alphanumeric characters are allowed",
});
const dateFromString = z
  .string()
  .refine((val) => !isNaN(Date.parse(val)), { message: "Invalid date format" })
  .transform((val) => new Date(val));
const futureDate = dateFromString.refine((d) => d < new Date(), {
  message: "Date must be in the past",
});
export const incomeDetailSchema = z.object({
  //salaried
  incomeType: z.enum(["Salaried", "Self Employed"]),
  empDetailFetchMethod: z.enum(["AECB", "Salary Certificate"]),
  employerName: z.string().min(2, "Employer Name is required"),
  employedFrom: z.string().min(1, "Employed From required"),
  currentExp: z.number().min(0, "Current Experience is required"),
  totalExp: z.number().min(0, "Total Experience is required"),
  emirate: z.string().min(2, "Emirates is required"),
  
  //self Employed
  businessDetailFetchMethod: z.enum(["Upload Trade License", "Manually Enter"]),
  nameOfBusiness: z.string().min(2, "Name of Business is required"),
  legalForm: z.string().min(2, "Name of Business is required"),
  emiratesBusiness: z.string().min(2, "Emirates is required"),
  dateOfEstabilishment: futureDate,
  vintage: z.number().min(0, "Vintage is required"),
  licenseNo: alphaNum.min(8, "License No is required"),
  natureOfBusiness: z.string().min(2, "Nature of Business is required"),
  
 //income Detail
  incomeDetailFetchMethod: z.enum(["Salary Transfer", "Fetch From Bank", "Upload Bank Statement", "UAE-FTS"]),
  monthlySalaryBankTransfer: z
    .number()
    .min(0, "Monthly Salary (Bank Transfer) is required"),
  monthlySalaryAECB: z.number().min(0, "Monthly Salary (AECB) is required"),
  emirateId: z.number().min(15, "Emirates ID is required"),
  ibanNo: alphaNum.min(20, "IBAN No is required"),
  bankingCode: z.number().min(1, "Banking Code is required"),
  startDateFts: futureDate,
  endDateFts: dateFromString,
  ftsStatus: z.enum(["Initated", "Pending", "Completed"]),
  bankName:z.string().min(2, "Bank Name is required"),
  accountNo:z.number().min(10, "Account No is required"),
  last6MonthsADB:z.number().min(1, "Last 6 Months ADB is required"),
  last6MonthsAvgCredit:z.number().min(1, "Last 6 Months AC is required"),
});
