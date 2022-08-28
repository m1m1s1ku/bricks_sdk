/* eslint-disable class-methods-use-this */
import { fetch, Headers, RequestInit } from 'undici';
import { z } from 'zod';

import {
  AuthenticationTokenInput,
  AuthenticationTokenOutput,
} from './schema/customers/authentication-token';

import { BricksError } from './errors/bricks_error';
import { MeInput, MeOutput } from './schema/customers/me';
import { ReferralsInput, ReferralsOutput } from './schema/customers/referrals';
import { DealsInput, DealsOutput } from './schema/marketplace/deals';
import { PastDealsInput, PastDealsOutput } from './schema/marketplace/past';
import {
  BrickPriceChartOutput,
  MonthlyDividendsChartOutput,
  PropertyInput,
  PropertyOutput,
} from './schema/properties/property';
import { PurchaseInput, PurchaseOutput } from './schema/marketplace/purchase';

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

  public async getReferrals({
    token,
  }: z.infer<typeof ReferralsInput>): Promise<
    z.infer<typeof ReferralsOutput> | RemoteError | string
  > {
    return this.#callApi(
      `referrals`,
      {
        method: 'GET',
        headers: new Headers({
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        }),
      },
      ReferralsOutput
    );
  }

  public async getDeals({
    token,
    priceRange = 100,
    priceRangeMax = 500000,
    profitabilityRange = 5,
    profitabilityRangeMax = 20,
    dividendsRange = 2,
    dividendsRangeMax = 15,
    sort = 'createdAt_desc',
    cursor = 0,
    take = 10,
  }: z.infer<typeof DealsInput>): Promise<z.infer<typeof DealsOutput> | RemoteError | string> {
    const data = new URLSearchParams();
    data.set('priceRange', `${priceRange}`);
    data.set('priceRange', `${priceRangeMax}`);
    data.set('profitabilityRange', `${profitabilityRange}`);
    data.set('profitabilityRange', `${profitabilityRangeMax}`);
    data.set('dividendsRange', `${dividendsRange}`);
    data.set('dividendsRange', `${dividendsRangeMax}`);
    data.set('sort', sort);
    data.set('cursor', `${cursor}`);
    data.set('take', `${take}`);

    return this.#callApi(
      `marketplace/deals`,
      {
        method: 'GET',
        headers: new Headers({
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        }),
      },
      DealsOutput
    );
  }

  public async getPastDeals({
    token,
  }: z.infer<typeof PastDealsInput>): Promise<
    z.infer<typeof PastDealsOutput> | RemoteError | string
  > {
    return this.#callApi(
      `marketplace/deals/past`,
      {
        method: 'GET',
        headers: new Headers({
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        }),
      },
      PastDealsOutput
    );
  }

  public async getProperty({
    token,
    propertyId,
  }: z.infer<typeof PropertyInput>): Promise<
    z.infer<typeof PropertyOutput> | RemoteError | string
  > {
    return this.#callApi(
      `properties/${propertyId}`,
      {
        method: 'GET',
        headers: new Headers({
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        }),
      },
      PropertyOutput
    );
  }

  public async getMonthlyDividendsChartForProperty({
    token,
    propertyId,
  }: z.infer<typeof PropertyInput>): Promise<
    z.infer<typeof MonthlyDividendsChartOutput> | RemoteError | string
  > {
    return this.#callApi(
      `properties/${propertyId}/monthly-dividends-chart`,
      {
        method: 'GET',
        headers: new Headers({
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        }),
      },
      MonthlyDividendsChartOutput
    );
  }

  public async getBrickPriceChartForProperty({
    token,
    propertyId,
  }: z.infer<typeof PropertyInput>): Promise<
    z.infer<typeof MonthlyDividendsChartOutput> | RemoteError | string
  > {
    return this.#callApi(
      `properties/${propertyId}/brick-price-chart`,
      {
        method: 'GET',
        headers: new Headers({
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        }),
      },
      BrickPriceChartOutput
    );
  }

  public async purchaseDeal({
    token,
    dealId,
  }: z.infer<typeof PurchaseInput>): Promise<
    z.infer<typeof PurchaseOutput> | RemoteError | string
  > {
    return this.#callApi(
      `marketplace/deal/${dealId}/purchase`,
      {
        method: 'GET',
        headers: new Headers({
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        }),
      },
      PurchaseOutput
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
        // console.warn('path', path, 'body', body);
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
