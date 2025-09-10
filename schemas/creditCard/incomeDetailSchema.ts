import { z } from "zod";

const alphaNum = z.string().regex(/^[A-Za-z0-9]+$/, {
  message: "Only alphanumeric characters are allowed",
});

const dateFromString = z
  .string()
  .refine((val) => !isNaN(Date.parse(val)), { message: "Invalid date format" })
  .transform((val) => new Date(val));

const pastDate = dateFromString.refine((d) => d < new Date(), {
  message: "Date must be in the past",
});

export const incomeDetailSchema = z.object({
  // salaried
  incomeType: z.string(),
  empDetailFetchMethod: z.string(),
  employerName: z.string().min(2, "Employer Name is required"),
  //employedFrom: pastDate,
  currentExp: z.coerce.number().min(1, "Current Experience is required"),
  totalExp: z.coerce.number().min(1, "Total Experience is required"),
  emirate: z.string().min(2, "Emirates is required"),

  // self-employed
  businessDetailFetchMethod: z.string(),
  nameOfBusiness: z.string().min(2, "Name of Business is required"),
  legalForm: z.string().min(2, "Legal Form is required"),
  emiratesBusiness: z.string().min(2, "Emirates is required"),
 // dateOfEstabilishment: pastDate,
  vintage: z.coerce.number().min(1, "Vintage is required"),
  licenseNo: alphaNum.min(8, "License No must be at least 8 characters"),
  natureOfBusiness: z.string().min(2, "Nature of Business is required"),

  // income detail
  incomeDetailFetchMethod: z.string(),
  monthlySalaryBankTransfer: z.coerce
    .number()
    .min(0, "Monthly Salary (Bank Transfer) is required"),
  monthlySalaryAECB: z.coerce
    .number()
    .min(0, "Monthly Salary (AECB) is required"),
  emirateId: z.string().min(15, "Emirates ID is required"),
  ibanNo: alphaNum.min(20, "IBAN No must be at least 20 characters"),
  bankingCode: z.coerce.number().min(1, "Banking Code is required"),
  startDateFts: pastDate,
  endDateFts: dateFromString,
  ftsStatus: z.enum(["Initiated", "Pending", "Completed"]),
  bankName: z.string().min(2, "Bank Name is required"),
  accountNo: z.coerce.number().min(10, "Account No is required"),
  last6MonthsADB: z.coerce.number().min(1, "Last 6 Months ADB is required"),
  last6MonthsAvgCredit: z.coerce
    .number()
    .min(1, "Last 6 Months AC is required"),
});
