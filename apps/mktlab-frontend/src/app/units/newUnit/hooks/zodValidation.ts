import { validateCnpj } from '@v4company/utils';
import { z } from 'zod';

const mandatoryMessage = 'Dado obrigatório';

export const unitIdentificationSchema = z.object({
  cnpj: z
    .string({
      message: mandatoryMessage,
    })
    .refine(
      (value) => {
        return validateCnpj(value);
      },
      { message: mandatoryMessage }
    ),
  fantasyName: z.string({
    message: mandatoryMessage,
  }),
  socialName: z.string({
    message: mandatoryMessage,
  }),
  // startFundation: z.string({
  //   message: 'Data de fundação inválida',
  // }),
  businessType: z.string({
    message: mandatoryMessage,
  }),
  cnae: z.string({
    message: mandatoryMessage,
  }),
  enterpriseType: z.string({
    message: mandatoryMessage,
  }),
  taxRegime: z.string({
    message: mandatoryMessage,
  }),
  address: z.object({
    zipCode: z.string({
      message: mandatoryMessage,
    }),
    street: z.string({
      message: mandatoryMessage,
    }),
    state: z.string({
      message: mandatoryMessage,
    }),
    number: z.string({
      message: mandatoryMessage,
    }),
    city: z.string({
      message: mandatoryMessage,
    }),
    district: z.string({
      message: mandatoryMessage,
    }),
    complement: z.string({
      message: mandatoryMessage,
    }),
  }),
});

const addressSchema = z.object({
  zipCodePartner: z
    .string({
      message: mandatoryMessage,
    })
    .min(7, {
      message: mandatoryMessage,
    }),
  streetPartner: z
    .string({
      message: mandatoryMessage,
    })
    .min(3, {
      message: mandatoryMessage,
    }),
  statePartner: z
    .string({
      message: mandatoryMessage,
    })
    .min(2, {
      message: mandatoryMessage,
    }),
  numberPartner: z
    .string({
      message: mandatoryMessage,
    })
    .min(1, {
      message: mandatoryMessage,
    }),
  cityPartner: z
    .string({
      message: mandatoryMessage,
    })
    .min(3, {
      message: mandatoryMessage,
    }),
  districtPartner: z
    .string({
      message: mandatoryMessage,
    })
    .min(3, {
      message: mandatoryMessage,
    }),
  complementPartner: z
    .string({
      message: mandatoryMessage,
    })
    .min(3, {
      message: mandatoryMessage,
    }),
  countryPartner: z.string().default('Brasil'),
});

const partnerSchema = z.object({
  namePartner: z
    .string({
      message: mandatoryMessage,
    })
    .min(3, {
      message: mandatoryMessage,
    }),
  surnamePartner: z
    .string({
      message: mandatoryMessage,
    })
    .min(3, {
      message: mandatoryMessage,
    }),
  businessEmailPartner: z
    .string({
      message: mandatoryMessage,
    })
    .email({
      message: 'E-mail inválido',
    })
    .min(3, {
      message: mandatoryMessage,
    }),
  telephonePartner: z
    .string({
      message: mandatoryMessage,
    })
    .min(8, {
      message: mandatoryMessage,
    }),
  cpfPartner: z
    .string()
    .regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, 'Formato de CPF inválido'),
  rgPartner: z
    .string({
      message: mandatoryMessage,
    })
    .min(3, {
      message: mandatoryMessage,
    }),
  birthdayPartner: z.date({
    message: mandatoryMessage,
  }),
  emailPartner: z
    .string({
      message: 'E-mail inválido',
    })
    .email({
      message: 'E-mail inválido',
    }),
  motherNamePartner: z
    .string({
      message: mandatoryMessage,
    })
    .min(3, {
      message: mandatoryMessage,
    }),
  address: addressSchema,
});

export const partnersFormSchema = z.object({
  partners: z.array(partnerSchema),
});

export const documentsFormSchema = z.object({
  cof: z.string({
    message: mandatoryMessage,
  }),
  taxFranchiseTraining: z.string({
    message: mandatoryMessage,
  }),
  startDateFranchise: z.date({
    message: mandatoryMessage,
  }),
});
