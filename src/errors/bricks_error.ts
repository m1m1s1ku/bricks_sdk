import { z } from 'zod';

export const BricksError = z.object({
  statusCode: z.number(),
  error: z.string(),
  message: z.string(),
});
