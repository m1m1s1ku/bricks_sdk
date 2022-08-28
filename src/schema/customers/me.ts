import { z } from 'zod';
import { BricksUser } from './authentication-token';

export const MeInput = z.object({
  token: z.string(),
});

export const MeOutput = BricksUser;
