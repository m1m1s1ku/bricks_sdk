import { z } from 'zod';

export const FAQInput = z.object({
  token: z.string(),
});

export const FAQItem = z.object({ title: z.string(), description: z.string() });

export const FAQOutput = z.object({
  Fonctionnement: z.array(FAQItem),
  Marketplace: z.array(FAQItem),
  'Gestion immobilière': z.array(FAQItem),
  Financier: z.array(FAQItem),
  Fiscalité: z.array(FAQItem),
  Légal: z.array(FAQItem),
  Comptabilité: z.array(FAQItem),
});
