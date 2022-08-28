import { z } from 'zod';
import { RemoteError } from '../api';
import { BricksError } from './bricks_error';

function isBricksError(err: unknown): err is z.infer<typeof BricksError> {
  const bricksError = err as z.infer<typeof BricksError>;
  return !!bricksError.statusCode || !!bricksError.message;
}

export function isExternalError(err: unknown): err is RemoteError {
  return isBricksError(err);
}

export function isGatewayError(err: unknown): err is string {
  return typeof err === 'string';
}
