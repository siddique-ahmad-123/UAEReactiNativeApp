import { z } from "zod";

export const borrowerSchema = z
  .object({
    borrowerName: z.string().min(1, "Name is required"),

    borrowerDOB: z.coerce.date().refine(
      (val) => !isNaN(val.getTime()),
      "Invalid date format"
    ),
    borrowerAge: z.coerce.number().min(18, "Borrower must be at least 18"),

    borrowerGender: z.enum(["male", "female", "other"], {
      message: "Gender is required",
    }),

    borrowerNationality: z.string().min(1, "Nationality is required"),
    borrowerResidenceCountry: z.string().min(1, "Residence country is required"),

    borrowerEidaNo: z.string().min(1, "EIDA No is required"),
    borrowerEidaIssueDate: z.coerce.date(),
    borrowerEidaExpiryDate: z.coerce.date(),

    borrowerPassportNo: z.string().optional(),
    borrowerPassportIssueDate: z.coerce.date().optional(),
    borrowerPassportExpiryDate: z.coerce.date().optional(),

    borrowerVisaNo: z.string().optional(),
    borrowerVisaIssueDate: z.coerce.date().optional(),
    borrowerVisaExpiryDate: z.coerce.date().optional(),

    borrowerEmailId: z.string().email("Invalid email format"),
    borrowerMobileNo: z.string().regex(/^\d{8,15}$/, "Enter valid mobile number"),

    borrowerResidenceVintage: z.coerce
      .number()
      .min(0, "Invalid residence vintage"),
    borrowerNoOfDependents: z.coerce
      .number()
      .min(0)
      .max(20, "Too many dependents"),

    borrowerAddressLine1: z.string().min(1, "Address Line 1 required"),
    borrowerAddressLine2: z.string().optional(),
    borrowerEmirates: z.string().min(1, "Emirates is required"),
    borrowerCountry: z.string().min(1, "Country is required"),

    borrowerVerificationStatus: z.enum(["pending", "verified", "rejected"], {
      message: "Verification status is required",
    }),

    borrowerNationalityStatus: z.enum(["citizen", "resident", "expat"], {
      message: "Nationality status is required",
    }),
  })
  .superRefine((data, ctx) => {
    // EIDA: Expiry must be after Issue
    if (
      data.borrowerEidaIssueDate &&
      data.borrowerEidaExpiryDate &&
      data.borrowerEidaExpiryDate <= data.borrowerEidaIssueDate
    ) {
      ctx.addIssue({
        path: ["borrowerEidaExpiryDate"],
        code: "custom",
        message: "EIDA expiry date must be after issue date",
      });
    }

    // Passport: Expiry must be after Issue
    if (
      data.borrowerPassportIssueDate &&
      data.borrowerPassportExpiryDate &&
      data.borrowerPassportExpiryDate <= data.borrowerPassportIssueDate
    ) {
      ctx.addIssue({
        path: ["borrowerPassportExpiryDate"],
        code: "custom",
        message: "Passport expiry date must be after issue date",
      });
    }

    // Visa: Expiry must be after Issue
    if (
      data.borrowerVisaIssueDate &&
      data.borrowerVisaExpiryDate &&
      data.borrowerVisaExpiryDate <= data.borrowerVisaIssueDate
    ) {
      ctx.addIssue({
        path: ["borrowerVisaExpiryDate"],
        code: "custom",
        message: "Visa expiry date must be after issue date",
      });
    }

    // Age & DOB consistency check
    if (data.borrowerDOB) {
      const today = new Date();
      const ageFromDOB =
        today.getFullYear() - data.borrowerDOB.getFullYear() -
        (today <
        new Date(
          today.getFullYear(),
          data.borrowerDOB.getMonth(),
          data.borrowerDOB.getDate()
        )
          ? 1
          : 0);

      if (data.borrowerAge !== ageFromDOB) {
        ctx.addIssue({
          path: ["borrowerAge"],
          code: "custom",
          message: `Age should match DOB (expected ${ageFromDOB})`,
        });
      }
    }
  });
