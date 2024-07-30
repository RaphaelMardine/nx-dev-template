import { z } from "zod";

export const schemaFilters = z.object({
    customer: z.string({}).optional(),
    unit: z.string({}).optional(),
    startDatePeriod: z.date({}).optional(),
    endDatePeriod: z.date({}).optional(),
    status: z.string({}).optional(),
    minTotalAmount: z.string({}).optional(),
    maxTotalAmount: z.string({}).optional(),
    dueDate: z.date({}).optional(),
  });
  