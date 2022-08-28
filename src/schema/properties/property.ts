import { z } from 'zod';

export const PropertiesInput = z.object({
  token: z.string(),
  take: z.number().default(10).optional(),
  cursor: z.number().default(0).optional(),
  withTransaction: z.boolean().default(true).optional(),
});

export const PropertyInput = z.object({
  token: z.string(),
  propertyId: z.string(),
});

export const PropertyOutput = z.object({
  id: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  name: z.object({ en: z.string(), fr: z.string() }),
  description: z.object({ en: z.string(), fr: z.string() }),
  investmentCase: z.object({ en: z.string(), fr: z.string() }),
  imageGallery: z.array(z.string()),
  videoGallery: z.array(z.string()),
  documents: z.array(z.string()),
  address: z.object({ en: z.string(), fr: z.string() }),
  localisationDescription: z.object({ en: z.string(), fr: z.string() }),
  floor: z.number(),
  surface: z.object({ en: z.string(), fr: z.string() }),
  bedrooms: z.number(),
  bathrooms: z.number(),
  kitchen: z.null(),
  gym: z.null(),
  patio: z.null(),
  pool: z.null(),
  hotTub: z.null(),
  parking: z.null(),
  propertyCondition: z.number(),
  neighborhood: z.number(),
  schools: z.number(),
  transport: z.object({
    bike: z.object({ enabled: z.boolean() }),
    train: z.object({ enabled: z.boolean() }),
  }),
  offeringName: z.null(),
  offerDateStart: z.string(),
  numberOfBricks: z.number(),
  minCommitmentBricks: z.null(),
  maxCommitmentBricks: z.null(),
  type: z.string(),
  status: z.string(),
  publishStatus: z.string(),
  purchasedDate: z.string(),
  propertyValuation: z.number(),
  capitalGrowth: z.number(),
  foundingTarget: z.number(),
  rentalDividends: z.number(),
  dividendsYield: z.number(),
  returnOnInvestment: z.number(),
  propertyPurchaseCost: z.number(),
  otherPropertyPurchaseCost: z.number(),
  transactionCost: z.number(),
  cashReserve: z.number(),
  totalAcquisitionCost: z.number(),
  debtRemaining: z.number(),
  taxesOnResale: z.number(),
  grossRentPerYear: z.number(),
  propertyExpenses: z.number(),
  debtReimbursement: z.number(),
  netRentalBeforeTaxes: z.number(),
  taxesPayments: z.number(),
  netRentalPerYear: z.number(),
  initialDebt: z.number(),
  loanTerms: z.object({ en: z.string(), fr: z.string() }),
  loanType: z.object({ en: z.string(), fr: z.string() }),
  interestRate: z.number(),
  brickPrice: z.number(),
  lemonwayAccountId: z.string(),
  propertyAdvantages: z.array(
    z.object({
      propertyId: z.string(),
      id: z.string(),
      createdAt: z.string(),
      updatedAt: z.string(),
      title: z.object({ en: z.string(), fr: z.string() }),
      description: z.object({ en: z.string(), fr: z.string() }),
    })
  ),
  propertyMonthlyUpdates: z.array(
    z.object({
      propertyId: z.string(),
      id: z.string(),
      createdAt: z.string(),
      updatedAt: z.string(),
      description: z.object({ en: z.string(), fr: z.string() }),
    })
  ),
  expDate: z.string(),
  bricksFunded: z.number(),
  isFunded: z.boolean(),
  investors: z.number(),
  totalValue: z.number(),
  lastDividendsPaidDate: z.string(),
  lastDividendsPerBrick: z.number(),
  bricksUser: z.object({
    currentOwned: z.number(),
    onSale: z.number(),
    maxOwned: z.number(),
  }),
});

export const MonthlyDividendsChartOutput = z.object({
  month: z.unknown().nullable(),
  value: z.unknown().nullable(),
});

export const BrickPriceChartOutput = z.object({
  month: z.string().nullable(),
  value: z.number().nullable(),
});
