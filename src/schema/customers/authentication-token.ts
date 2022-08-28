import { z } from 'zod';

export const AuthenticationTokenInput = z.object({
  username: z.string().email(),
  password: z.string(),
});

export const BricksCustomerProfile = z.object({
  addressComplement: z.string().nullable(),
  citizenship: z.string(),
  city: z.string(),
  cityOfBirth: z.string(),
  country: z.string(),
  countryOfBirth: z.string(),
  createdAt: z.string(),
  customerId: z.string(),
  customerType: z.string(),
  dateOfBirth: z.string(),
  id: z.string(),
  identifyDocument: z.string().nullable(),
  lastName: z.string(),
  phone: z.string(),
  phoneCode: z.string().nullable(),
  postOfBirth: z.string().nullable(),
  postcode: z.string(),
  proofOfAddress: z.string().nullable(),
  sex: z.string(),
  street: z.string(),
  updatedAt: z.string(),
});

export const BricksUser = z.object({
  KYCdocuments: z.array(z.unknown()),
  bricksLegacyBalance: z.number(),
  createdAt: z.string(),
  customerProfile: BricksCustomerProfile,
  deletedAt: z.string().nullable(),
  email: z.string(),
  id: z.string(),
  isEmailVerified: z.boolean(),
  isOnboardingSkipped: z.boolean(),
  isPendingKYCValidation: z.boolean(),
  isPhoneVerified: z.boolean(),
  lemonwayBalance: z.number(),
  lemonwayBic: z.string(),
  lemonwayDomiciliation: z.string(),
  lemonwayHolder: z.string(),
  lemonwayIban: z.string(),
  lemonwayStatus: z.number(),
  referrerLinkId: z.string().nullable(),
  role: z.string(),
  transactionRights: z.string(),
  updatedAt: z.string(),
});

export const AuthenticationTokenOutput = z.object({
  token: z.string(),
  user: BricksUser,
});
