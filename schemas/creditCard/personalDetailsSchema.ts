import { z } from "zod";

export const personalDetailsSchema = z.object({
  name: z.string().min(3, "Name is required"),
  dob: z.date(),
  age: z.number(),
  gender: z.enum(["Male", "Female", "Others"]),
  nationality: z.string(),
  residenceCountry: z.string(),
  eidaNo: z.number().min(15, "Please enter a 15 digit EIDA Number"),
  eidaIssueDate: z.date(),
  eidaExpiryDate: z.date(),
  passportNo: z.string().min(8, "Please enter a valid sized passport number"),
  passportIssueDate: z.date(),
  passportExpiryDate: z.date(),
  visaNo: z.string().min(8, "Please enter a valid sized visa number"),
  visaIssueDate: z.date(),
  visaExpiryDate: z.date(),
  emailId: z.email(),
  mobileNo: z.number(),
  residenceVintage: z.number(),
  noOfDependents: z
    .number()
    .min(15, "Please enter a valid number of dependents"),

  //Address details
  addressLine1: z.string(),
  addressLine2: z.string(),
  emirates: z.string(),
  country: z.string(),

  //EFR Check
  verificationStatus: z.string(),
});
