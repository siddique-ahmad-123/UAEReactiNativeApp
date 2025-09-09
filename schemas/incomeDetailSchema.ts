import { z } from 'zod';

export const incomeDetailSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  dob: z.string().min(1, 'Date of Birth required'),
  gender: z.enum(['Male', 'Female', 'Other']),
  nationality: z.string().min(1),
});
