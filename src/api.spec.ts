import { faker } from '@faker-js/faker';
import { MockAgent, setGlobalDispatcher } from 'undici';
import { z } from 'zod';
import { Api, kApiBaseURL, RemoteError } from './api';
import { isExternalError } from './errors';
import { AuthenticationTokenOutput } from './schema/customers/authentication-token';

const mockAgent: MockAgent = new MockAgent({});
setGlobalDispatcher(mockAgent);

const mockPool = mockAgent.get(kApiBaseURL);

describe('Api', () => {
  describe('login', () => {
    it('calls the api with the right parameters', async () => {
      const sdk = new Api();

      const creds = {
        username: faker.internet.email(),
        password: faker.internet.password(),
      };

      const mockedResponse: Partial<z.infer<typeof AuthenticationTokenOutput> | RemoteError> = {
        token: faker.datatype.string(100),
      };

      mockPool
        .intercept({
          path: 'customers/email/sign-in',
          method: 'POST',
        })
        .reply(200, mockedResponse);

      const response = await sdk.login(creds);

      if (isExternalError(response)) {
        expect(response).toHaveProperty('message');
      } else {
        expect(response).toHaveProperty('token');
      }
    });
  });
});
