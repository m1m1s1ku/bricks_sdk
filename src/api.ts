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
  PropertiesInput,
  PropertiesOutput,
  PropertyInput,
  PropertyOutput,
} from './schema/properties/property';
import { PurchaseInput, PurchaseOutput } from './schema/marketplace/purchase';
import {
  HistoricalDividendsChartInput,
  HistoricalDividendsChartOutput,
  HistoricalPortfolioChartInput,
  HistoricalPortfolioChartOutput,
} from './schema/customers/historical-portfolio-chart';
import {
  CanSellTodayInput,
  CanSellTodayOutput,
  MakeDealInput,
  MakeDealOutput,
} from './schema/marketplace/deal';
import { GetCustomerDealsInput, GetCustomerDealsOutput } from './schema/customers/deals';
import { DeleteDealInput, DeleteDealOutput } from './schema/marketplace/delete';
import { FAQInput, FAQOutput } from './schema/help/faq';
import { VersionOutput } from './schema/version';

export type RemoteError = z.infer<typeof BricksError>;

export const kApiBaseURL = 'https://api.bricks.co/';

const defaultHeaders = {
  'Content-Type': 'application/json',
};

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
        headers: new Headers({
          ...defaultHeaders,
        }),
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
          ...defaultHeaders,
          Authorization: `Bearer ${token}`,
        }),
      },
      MeOutput
    );
  }

  public async getHistoricalPortfolioChart({
    token,
  }: z.infer<typeof HistoricalPortfolioChartInput>): Promise<
    z.infer<typeof HistoricalPortfolioChartOutput> | RemoteError | string
  > {
    return this.#callApi(
      `customers/historical-portfolio-chart`,
      {
        method: 'GET',
        headers: new Headers({
          ...defaultHeaders,
          Authorization: `Bearer ${token}`,
        }),
      },
      HistoricalPortfolioChartOutput
    );
  }

  public async getHistoricalDividendsChart({
    token,
  }: z.infer<typeof HistoricalDividendsChartInput>): Promise<
    z.infer<typeof HistoricalDividendsChartOutput> | RemoteError | string
  > {
    return this.#callApi(
      `customers/historical-dividends-chart`,
      {
        method: 'GET',
        headers: new Headers({
          ...defaultHeaders,
          Authorization: `Bearer ${token}`,
        }),
      },
      HistoricalDividendsChartOutput
    );
  }

  public async getCustomerDeals({
    token,
  }: z.infer<typeof GetCustomerDealsInput>): Promise<
    z.infer<typeof GetCustomerDealsOutput> | RemoteError | string
  > {
    return this.#callApi(
      `customers/marketplace/deals`,
      {
        method: 'GET',
        headers: new Headers({
          ...defaultHeaders,
          Authorization: `Bearer ${token}`,
        }),
      },
      GetCustomerDealsOutput
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
          ...defaultHeaders,
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
        body: data,
        headers: new Headers({
          ...defaultHeaders,
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
          ...defaultHeaders,
          Authorization: `Bearer ${token}`,
        }),
      },
      PastDealsOutput
    );
  }

  public async canSellToday({
    token,
  }: z.infer<typeof CanSellTodayInput>): Promise<
    z.infer<typeof CanSellTodayOutput> | RemoteError | string
  > {
    return this.#callApi(
      `marketplace/deal/can-sell-today`,
      {
        method: 'GET',
        headers: new Headers({
          ...defaultHeaders,
          Authorization: `Bearer ${token}`,
        }),
      },
      CanSellTodayOutput
    );
  }

  public async makeDeal({
    token,
    amount,
    price,
    propertyId,
  }: z.infer<typeof MakeDealInput>): Promise<
    z.infer<typeof MakeDealOutput> | RemoteError | string
  > {
    return this.#callApi(
      `marketplace/deal`,
      {
        method: 'POST',
        headers: new Headers({
          ...defaultHeaders,
          Authorization: `Bearer ${token}`,
        }),
        body: JSON.stringify({
          amount,
          price,
          propertyId,
        }),
      },
      MakeDealOutput
    );
  }

  public async getProperties({
    token,
    cursor = 0,
    take = 10,
    withTransaction = true,
  }: z.infer<typeof PropertiesInput>): Promise<
    z.infer<typeof PropertiesOutput> | RemoteError | string
  > {
    const data = new URLSearchParams();
    data.set('cursor', `${cursor}`);
    data.set('take', `${take}`);
    data.set('withTransactions', `${withTransaction}`);

    return this.#callApi(
      `properties`,
      {
        body: data,
        method: 'GET',
        headers: new Headers({
          ...defaultHeaders,
          Authorization: `Bearer ${token}`,
        }),
      },
      PropertiesOutput
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
          ...defaultHeaders,
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
          ...defaultHeaders,
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
          ...defaultHeaders,
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
          ...defaultHeaders,
          Authorization: `Bearer ${token}`,
        }),
      },
      PurchaseOutput
    );
  }

  public async deleteDeal({
    token,
    dealId,
  }: z.infer<typeof DeleteDealInput>): Promise<
    z.infer<typeof DeleteDealOutput> | RemoteError | string
  > {
    return this.#callApi(
      `marketplace/deal/${dealId}`,
      {
        method: 'DELETE',
        headers: new Headers({
          ...defaultHeaders,
          Authorization: `Bearer ${token}`,
        }),
      },
      DeleteDealOutput
    );
  }

  public async getFAQ({
    token,
  }: z.infer<typeof FAQInput>): Promise<z.infer<typeof FAQOutput> | RemoteError | string> {
    return this.#callApi(
      `help/faq`,
      {
        method: 'GET',
        headers: new Headers({
          ...defaultHeaders,
          Authorization: `Bearer ${token}`,
        }),
      },
      FAQOutput
    );
  }

  public async getVersion(): Promise<z.infer<typeof VersionOutput> | RemoteError | string> {
    return this.#callApi(
      `version`,
      {
        method: 'GET',
        headers: new Headers({
          ...defaultHeaders,
        }),
      },
      VersionOutput
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
