/* eslint-disable import/no-extraneous-dependencies */
import pino from 'pino';
import SonicBoom from 'sonic-boom';

export const logger = pino(
  {
    name: 'BricksSDK',
    level: 'info',
  },
  new SonicBoom({ fd: process.stdout.fd })
);
