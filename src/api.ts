/* eslint-disable class-methods-use-this */
import { fetch, Headers, RequestInit } from 'undici';
import { z } from 'zod';

import { AuthenticationTokenInput, AuthenticationTokenOutput } from './schema/authentication-token';

import { BricksError } from './errors/bricks_error';
import { MeInput, MeOutput } from './schema/v1/me';

export type RemoteError = z.infer<typeof BricksError>;

const kApiBaseURL = 'https://api.bricks.co/';

export class Api {
  public async login({
    username,
    password,
  }: z.infer<typeof AuthenticationTokenInput>): Promise<
    z.infer<typeof AuthenticationTokenOutput> | RemoteError | string
  > {
    return this.#callApi(
      'customers/email/sign-in',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: username,
          password,
        }),
      },
      AuthenticationTokenOutput
    );
  }

  public async getMe({
    token,
  }: z.infer<typeof MeInput>): Promise<z.infer<typeof MeOutput> | RemoteError | string> {
    return this.#callApi(
      `customers/me`,
      {
        method: 'GET',
        headers: new Headers({
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        }),
      },
      MeOutput
    );
  }

  static async #call<T>(
    path: string,
    options: RequestInit,
    type: z.ZodType<T>
  ): Promise<T | RemoteError | string> {
    const endpoint = kApiBaseURL.concat(path);
    const res = await fetch(endpoint, {
      ...options,
      body: options.body,
    });
    const clonedRes = res.clone();
    try {
      const body = (await res.json()) as T;
      try {
        console.warn('path', path, 'body', body);
        const output = await type.parseAsync(body);
        return output;
      } catch (err) {
        return BricksError.parseAsync(err);
      }
    } catch (err) {
      const text = await clonedRes.text();
      return text;
    }
  }

  #callApi<T>(
    url: string,
    options: RequestInit,
    type: z.ZodType<T>
  ): Promise<T | RemoteError | string> {
    return Api.#call(url, options, type);
  }
}
