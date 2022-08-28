import { z } from 'zod';

export const PurchaseInput = z.object({
  token: z.string(),
  dealId: z.string(),
});

export const PurchaseOutput = z.null();
