export const fieldNames = {
  //Personal Detail - Borrower
  borrowerName: "name",
  borrowerDOB: "dob",
} as const;

export type fieldNamesKey = keyof typeof fieldNames;
