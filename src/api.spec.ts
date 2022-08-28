// import { faker } from '@faker-js/faker';
import { MockAgent, setGlobalDispatcher } from 'undici';

const mockAgent: MockAgent = new MockAgent({});
setGlobalDispatcher(mockAgent);

describe('Api', () => {});
