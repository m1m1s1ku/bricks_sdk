import { z } from 'zod';

export const DealsInput = z.object({
  token: z.string(),
  priceRange: z.number().default(100).optional(),
  priceRangeMax: z.number().default(500000).optional(),
  profitabilityRange: z.number().default(5).optional(),
  profitabilityRangeMax: z.number().default(20).optional(),
  dividendsRange: z.number().default(2).optional(),
  dividendsRangeMax: z.number().default(15).optional(),
  sort: z.string().default('createdAt_desc').optional(),
  cursor: z.number().default(0).optional(),
  take: z.number().default(10).optional(),
});

export const BricksProperty = z.object({
  address: z.string(),
  currentBrickValuation: z.object({
    value: z.number(),
  }),
  id: z.string(),
  imageURL: z.string(),
  name: z.string(),
  rentalDividends: z.string(),
});

export const BricksDeal = z.object({
  bricksAmount: z.number(),
  createdAt: z.string(),
  deltaValuation: z.string(),
  id: z.string(),
  isDealOwner: z.boolean(),
  performance: z.object({
    deltaValuation: z.number(),
    dividendsYield: z.number(),
    profitability: z.number(),
    profitabilityWithoutComission: z.number().optional(),
  }),
  property: BricksProperty,
  unitPrice: z.number(),
  updatedAt: z.string(),
});

export const DealsOutput = z.object({
  cursor: z.number(),
  data: z.array(BricksDeal),
  count: z.number().optional(),
  link: z.string().optional(),
  pending: z.number().optional(),
});
