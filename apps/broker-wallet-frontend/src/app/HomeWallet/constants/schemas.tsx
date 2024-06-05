import { ZodType, z } from 'zod';

export const withdrawSchema: Record<string, { schema: ZodType }> = {
  amount: {
    schema: z.object({
      value: z.string({
        required_error: 'Insira o valor de saque',
      }),
    }),
  },
  account: {
    schema: z.object({
      telephone: z.string({
        required_error: 'Insira o telefone',
      }),
      email: z
        .string({
          required_error: 'Insira o email',
        })
        .email('Insira um email válido'),
      bank: z
        .string({
          required_error: 'Insira o banco',
        })
        .default('Banco do Brasil'),
      bankAg: z.string({
        required_error: 'Insira a agência',
      }),
      accontType: z.string({
        required_error: 'Insira o tipo de conta',
      }),
      bankCC: z.string({
        required_error: 'Insira a conta',
      }),
      respName: z.string({
        required_error: 'Insira o nome do responsável',
      }),
      respCpf: z.string({
        required_error: 'Insira o CPF do responsável',
      }),
    }),
  },
};

export const cardSchema: Record<string, { schema: ZodType }> = {
  address: {
    schema: z.object({
      cep: z.string({
        required_error: 'Insira o CEP',
      }),
      city: z.string({
        required_error: 'Insira a cidade',
      }),
      neighborhood: z.string({
        required_error: 'Insira o bairro',
      }),
      state: z.string({
        required_error: 'Insira o estado',
      }),
      street: z.string({
        required_error: 'Insira a rua',
      }),
      number: z.string({
        required_error: 'Insira o número',
      }),
      complement: z.string().optional(),
    }),
  },
  account: {
    schema: z.object({
      telephone: z.string({
        required_error: 'Insira o telefone',
      }),
      email: z
        .string({
          required_error: 'Insira o email',
        })
        .email('Insira um email válido'),
      bank: z
        .string({
          required_error: 'Insira o banco',
        })
        .default('Banco do Brasil'),
      bankAg: z.string({
        required_error: 'Insira a agência',
      }),
      accontType: z.string({
        required_error: 'Insira o tipo de conta',
      }),
      bankCC: z.string({
        required_error: 'Insira a conta',
      }),
      respName: z.string({
        required_error: 'Insira o nome do responsável',
      }),
      respCpf: z.string({
        required_error: 'Insira o CPF do responsável',
      }),
    }),
  },
  propertyCard: {
    schema: z.object({
      name: z.string({
        required_error: 'Insira o nome',
      }),
      email: z
        .string({
          required_error: 'Insira o e-mail',
          invalid_type_error: 'Insira um e-mail válido',
        })
        .email(),
      cpfOrCnpj: z.string({
        required_error: 'Insira o CPF ou CNPJ',
      }),
      phone: z.string({
        required_error: 'Insira o telefone',
      }),
    }),
  },
  infoCard: {
    schema: z.object({
      cardNumber: z.string({
        required_error: 'Insira o número do cartão',
      }),
      cardName: z.string({
        required_error: 'Insira o nome do titular',
      }),
      cardMonthExpiration: z.string({
        required_error: 'Insira o mês de validade',
      }),
      cardYearExpiration: z.string({
        required_error: 'Insira o ano de validade',
      }),
      cardCvv: z.string({
        required_error: 'Insira o CVV',
      }),
      cardToken: z.string().optional(),
    }),
  },
  amountCard: {
    schema: z.object({
      value: z.string({
        required_error: 'Insira o valor',
      }),
      installments: z.string({
        required_error: 'Insira o número de parcelas',
      }),
    }),
  },
};

export const bankSlipOrPixSchema: Record<string, { schema: ZodType }> = {
  amount: {
    schema: z.object({
      value: z.string({
        required_error: 'Insira o valor',
      }),
      email: z
        .string({
          required_error: 'Insira seu e-mail',
          invalid_type_error: 'Insira um e-mail válido',
        })
        .email(),
      expires: z
        .date({
          required_error: 'Insira a data de vencimento',
          invalid_type_error: 'Insira uma data válida',
        })
        .min(new Date(), 'Data de vencimento deve ser maior que a data atual'),
    }),
  },
  account: {
    schema: z.object({
      telephone: z.string({
        required_error: 'Insira o telefone',
      }),
      email: z
        .string({
          required_error: 'Insira o email',
        })
        .email('Insira um email válido'),
      bank: z
        .string({
          required_error: 'Insira o banco',
        })
        .default('Banco do Brasil'),
      bankAg: z.string({
        required_error: 'Insira a agência',
      }),
      accontType: z.string({
        required_error: 'Insira o tipo de conta',
      }),
      bankCC: z.string({
        required_error: 'Insira a conta',
      }),
      respName: z.string({
        required_error: 'Insira o nome do responsável',
      }),
      respCpf: z.string({
        required_error: 'Insira o CPF do responsável',
      }),
    }),
  },
};
