import { z } from 'zod';

export const CanSellTodayInput = z.object({
  token: z.string(),
});

export const CanSellTodayOutput = z.object({
  canSellToday: z.boolean(),
});

export const MakeDealInput = z.object({
  token: z.string(),
  amount: z.number(),
  price: z.number(),
  propertyId: z.string(),
});

export const MakeDealOutput = z.object({
  dealId: z.string(),
});
