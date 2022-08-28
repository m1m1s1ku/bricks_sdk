import { z } from 'zod';

export const DeleteDealInput = z.object({
  token: z.string(),
  dealId: z.string(),
});

export const DeleteDealOutput = z.null().optional();
