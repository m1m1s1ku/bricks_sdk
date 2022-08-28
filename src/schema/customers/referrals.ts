import { z } from 'zod';

export const ReferralsInput = z.object({
  token: z.string(),
});

export const ReferralsOutput = z.object({
  code: z.string(),
  confirmed: z.number(),
  count: z.number(),
  link: z.string(),
  pending: z.number(),
});
