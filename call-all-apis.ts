/* eslint-disable import/no-extraneous-dependencies */
import prompt from 'prompt';
import 'dotenv/config';

import { logger } from './logger';

import { Api } from './src';
import { isExternalError, isGatewayError } from './src/errors';

async function retrieveCreds() {
  let { USERNAME, PASSWORD } = process.env;
  if (USERNAME === undefined) {
    const response = await prompt.get(['username']);
    USERNAME = response.username as string;
    if (USERNAME) {
      throw new Error(`Missing env var "username".`);
    }
  }
  if (PASSWORD === undefined) {
    const response = await prompt.get(['password']);
    PASSWORD = response.password as string;
    if (!PASSWORD) {
      throw new Error(`Missing env var "password".`);
    }
  }

  return {
    USERNAME,
    PASSWORD,
  };
}

(async () => {
  const { USERNAME, PASSWORD } = await retrieveCreds();
  const api = new Api();

  const res = await api.login({ username: USERNAME, password: PASSWORD });
  if (isExternalError(res)) {
    logger.fatal('login error', res);
    return;
  }

  if (isGatewayError(res)) {
    logger.fatal('gateway error', res);
    return;
  }

  const { token } = res;

  const user = await api.getMe({ token });
  if (isExternalError(user)) {
    logger.fatal('getMe error', res);
    return;
  }

  logger.info({
    token,
    user,
  });
})().catch((e) => {
  logger.fatal(e);
  process.exit(-1);
});
