import { z } from 'zod';

export const HistoricalPortfolioChartInput = z.object({
  token: z.string(),
});

export const HistoricalPortfolioChartOutput = z.array(
  z.object({
    value: z.number(),
    month: z.string(),
  })
);

export const HistoricalDividendsChartInput = z.object({
  token: z.string(),
});

export const HistoricalDividendsChartOutput = z.array(
  z.object({
    value: z.number(),
    month: z.string(),
  })
);
