import { z } from 'zod';

export const GetCustomerDealsInput = z.object({
  token: z.string(),
});

export const GetCustomerDealsOutput = z.array(
  z.object({
    id: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
    isDealOwner: z.boolean(),
    bricksAmount: z.number(),
    deltaValuation: z.string(),
    profitability: z.string(),
    profitabilityWithoutCommission: z.string(),
    unitPrice: z.number(),
    property: z.object({
      id: z.string(),
      name: z.string(),
      address: z.string(),
      imageURL: z.string(),
      rentalDividends: z.string(),
      currentBrickValuation: z.object({ value: z.number() }),
    }),
    performance: z.object({
      deltaValuation: z.number(),
      profitability: z.number(),
      dividendsYield: z.number(),
      profitabilityWithoutCommission: z.number(),
    }),
  })
);
