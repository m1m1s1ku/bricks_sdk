import { z } from 'zod';
import { BricksDeal } from './deals';

export const PastDealsInput = z.object({
  token: z.string(),
});

export const PastDealsOutput = z.array(BricksDeal);
