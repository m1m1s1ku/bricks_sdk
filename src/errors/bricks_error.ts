import { z } from 'zod';

export const BricksError = z.object({
  statusCode: z.number().optional(),
  error: z.string().optional(),
  message: z.string(),
  title: z.string().optional(),
  type: z.string().optional(),
  path: z.string().optional(),
  timestamp: z.string().optional(),
});
