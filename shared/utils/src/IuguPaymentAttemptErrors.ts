export interface IPaymentAttemptErrorFields {
  message: string;
  action: string;
  irreversibleForFlags: string[];
}

export interface IPaymentAttemptErrorProps {
  [key: string]: IPaymentAttemptErrorFields;
}

export const paymentAttemptErrors: IPaymentAttemptErrorProps = {
  0: {
    message: 'Transação autorizada com sucesso',
    action: '',
    irreversibleForFlags: [],
  },
  '00': {
    message: 'Transação autorizada com sucesso',
    action: '',
    irreversibleForFlags: [],
  },
  1: {
    message:
      'Transação não autorizada. Referida (suspeita de fraude) pelo banco emissor.',
    action: '',
    irreversibleForFlags: ['Master'],
  },
  2: {
    message:
      ' Transação não autorizada. Referida (suspeita de fraude) pelo banco emissor.',
    action: '',
    irreversibleForFlags: [],
  },
  3: {
    message: 'Não foi possível processar a transação.',
    action: 'Entre em contato conosco',
    irreversibleForFlags: ['Master', 'Visa'],
  },
  4: {
    message: 'Transação não autorizada. Cartão bloqueado pelo banco emissor.',
    action: '',
    irreversibleForFlags: ['Master', 'Visa'],
  },
  5: {
    message: 'Transação não autorizada. Cartão inadimplente (Do not honor).',
    action: '',
    irreversibleForFlags: [],
  },
  6: {
    message: 'Transação não autorizada. Cartão cancelado.',
    action: '',
    irreversibleForFlags: ['Visa'],
  },
  7: {
    message: 'Transação negada.',
    action: 'Reter cartão condição especial',
    irreversibleForFlags: ['Visa'],
  },
  8: {
    message: 'Transação não autorizada. Código de segurança inválido.',
    action: '',
    irreversibleForFlags: ['Amex'],
  },
  9: {
    message: 'Transação cancelada parcialmente com sucesso.',
    action: '',
    irreversibleForFlags: [],
  },
  11: {
    message: 'Transação autorizada com sucesso para cartão emitido no exterior',
    action: '',
    irreversibleForFlags: [],
  },
  12: {
    message: 'Transação inválida, erro no cartão.',
    action: '',
    irreversibleForFlags: ['Master', 'Visa', 'Elo'],
  },
  13: {
    message: 'Transação não permitida. Valor da transação Inválido.',
    action: '',
    irreversibleForFlags: ['Master', 'Visa', 'Elo', 'Amex'],
  },
  14: {
    message: 'Transação não autorizada. Cartão Inválido',
    action: '',
    irreversibleForFlags: ['Master', 'Elo'],
  },
  15: {
    message: 'Banco emissor indisponível ou inexistente.',
    action: '',
    irreversibleForFlags: ['Master', 'Visa'],
  },
  19: {
    message: '',
    action: 'Refaça a transação ou tente novamente mais tarde.',
    irreversibleForFlags: ['Visa', 'Elo'],
  },
  21: {
    message: 'Cancelamento não efetuado. Transação não localizada.',
    action: '',
    irreversibleForFlags: [],
  },
  22: {
    message: 'Parcelamento inválido. Número de parcelas inválidas.',
    action: '',
    irreversibleForFlags: [],
  },
  23: {
    message: 'Transação não autorizada. Valor da prestação inválido.',
    action: '',
    irreversibleForFlags: ['Elo'],
  },
  24: {
    message: 'Quantidade de parcelas inválido.',
    action: '',
    irreversibleForFlags: [],
  },
  25: {
    message: 'Pedido de autorização não enviou número do cartão',
    action: '',
    irreversibleForFlags: ['Master'],
  },
  28: {
    message: 'Arquivo temporariamente indisponível.',
    action: '',
    irreversibleForFlags: ['Master'],
  },
  30: {
    message: 'Transação não autorizada. Decline Message',
    action: '',
    irreversibleForFlags: ['Master', 'Elo'],
  },
  39: {
    message: 'Transação não autorizada. Erro no banco emissor.',
    action: '',
    irreversibleForFlags: ['Master', 'Visa', 'Elo', 'Amex'],
  },
  41: {
    message: 'Transação não autorizada. Cartão bloqueado por perda.',
    action: '',
    irreversibleForFlags: ['Master', 'Visa', 'Elo'],
  },
  43: {
    message: 'Transação não autorizada. Cartão bloqueado por roubo.',
    action: '',
    irreversibleForFlags: ['Master', 'Visa', 'Elo'],
  },
  46: {
    message: 'Conta encerrada',
    action: '',
    irreversibleForFlags: ['Visa'],
  },
  51: {
    message: 'Transação não autorizada. Limite excedido/sem saldo.',
    action: '',
    irreversibleForFlags: [],
  },
  52: {
    message: 'Cartão com dígito de controle inválido.',
    action: '',
    irreversibleForFlags: ['Visa'],
  },
  53: {
    message: 'Transação não permitida. Cartão poupança inválido',
    action: '',
    irreversibleForFlags: ['Visa'],
  },
  54: {
    message: 'Transação não autorizada. Cartão vencido',
    action: '',
    irreversibleForFlags: ['Master'],
  },
  55: {
    message: 'Transação não autorizada. Senha inválida',
    action: '',
    irreversibleForFlags: [],
  },
  56: {
    message: 'NÚMERO CARTÃO NÃO PERTENCE AO EMISSOR | NÚMERO CARTÃO INVÁLIDO',
    action: '',
    irreversibleForFlags: ['Elo'],
  },
  57: {
    message: 'Transação não permitida para o cartão',
    action: '',
    irreversibleForFlags: ['Master', 'Visa', 'Elo'],
  },
  58: {
    message: 'Transação não permitida. Opção de pagamento inválida.',
    action: '',
    irreversibleForFlags: ['Master', 'Visa', 'Elo'],
  },
  59: {
    message: 'Transação não autorizada. Suspeita de fraude.',
    action: '',
    irreversibleForFlags: [],
  },
  60: {
    message: 'Transação não autorizada.',
    action: '',
    irreversibleForFlags: [],
  },
  61: {
    message: 'Banco emissor indisponível.',
    action: '',
    irreversibleForFlags: [],
  },
  62: {
    message: 'Transação não autorizada. Cartão restrito para uso doméstico',
    action: '',
    irreversibleForFlags: ['Master', 'Elo', 'Visa'],
  },
  63: {
    message: 'Transação não autorizada. Violação de segurança',
    action: '',
    irreversibleForFlags: ['Elo'],
  },
  64: {
    message:
      'Transação não autorizada. Valor abaixo do mínimo exigido pelo banco emissor.',
    action: '',
    irreversibleForFlags: ['Visa', 'Elo'],
  },
  65: {
    message:
      'Transação não autorizada. Excedida a quantidade de transações para o cartão.',
    action: '',
    irreversibleForFlags: [],
  },
  67: {
    message: 'Transação não autorizada. Cartão bloqueado para compras hoje.',
    action: '',
    irreversibleForFlags: [],
  },
  70: {
    message: 'Transação não autorizada. Limite excedido/sem saldo.',
    action: '',
    irreversibleForFlags: [],
  },
  72: {
    message:
      'Cancelamento não efetuado. Saldo disponível para cancelamento insuficiente.',
    action: '',
    irreversibleForFlags: [],
  },
  74: {
    message: 'Transação não autorizada. A senha está vencida.',
    action: '',
    irreversibleForFlags: ['Visa', 'Elo'],
  },
  75: {
    message: 'Senha bloqueada. Excedeu tentativas de cartão.',
    action: '',
    irreversibleForFlags: ['Master', 'Visa', 'Elo', 'Amex'],
  },
  76: {
    message:
      'Cancelamento não efetuado. Banco emissor não localizou a transação original',
    action: '',
    irreversibleForFlags: ['Visa'],
  },
  77: {
    message:
      'Cancelamento não efetuado. Não foi localizado a transação original',
    action: '',
    irreversibleForFlags: ['Elo'],
  },
  78: {
    message: 'Transação não autorizada. Cartão bloqueado primeiro uso.',
    action: '',
    irreversibleForFlags: [],
  },
  79: {
    message: 'Transação não autorizada.',
    action: 'Entre em contato com o seu banco.',
    irreversibleForFlags: ['Master', 'Visa', 'Elo', 'Amex'],
  },
  80: {
    message:
      'Transação não autorizada. Divergencia na data de transação/pagamento.',
    action: '',
    irreversibleForFlags: [],
  },
  81: {
    message: 'Transação não autorizada. A senha está vencida.',
    action: '',
    irreversibleForFlags: ['Visa'],
  },
  82: {
    message: 'Transação não autorizada. Cartão inválido',
    action: '',
    irreversibleForFlags: ['Visa', 'Elo'],
  },
  83: {
    message: 'Transação não autorizada. Erro no controle de senhas',
    action: '',
    irreversibleForFlags: [],
  },
  85: {
    message: 'Transação não permitida. Falha da operação.',
    action: '',
    irreversibleForFlags: [],
  },
  86: {
    message: 'Transação não permitida. Falha da operação.',
    action: '',
    irreversibleForFlags: [],
  },
  88: {
    message: 'Falha na criptografia dos dados.',
    action: '',
    irreversibleForFlags: ['Master'],
  },
  90: {
    message: 'Transação não permitida. Falha da operação.',
    action: '',
    irreversibleForFlags: [],
  },
  91: {
    message:
      'Transação não autorizada. Banco emissor temporariamente indisponível.',
    action: '',
    irreversibleForFlags: [],
  },
  92: {
    message: 'Transação não autorizada. Tempo de comunicação excedido.',
    action: '',
    irreversibleForFlags: ['Master', 'Visa'],
  },
  93: {
    message:
      'Transação não autorizada. Violação de regra, possível erro no cadastro.',
    action: '',
    irreversibleForFlags: ['Visa'],
  },
  94: {
    message: 'Transação duplicada.',
    action: '',
    irreversibleForFlags: ['Master'],
  },
  96: {
    message: 'Falha no processamento.',
    action: '',
    irreversibleForFlags: [],
  },
  97: {
    message: 'Valor não permitido para essa transação.',
    action: '',
    irreversibleForFlags: [],
  },
  98: {
    message: 'Sistema/comunicação indisponível.',
    action: '',
    irreversibleForFlags: [],
  },
  99: {
    message: 'Sistema/comunicação indisponível.',
    action: '',
    irreversibleForFlags: ['Elo'],
  },
  475: {
    message: 'Timeout de Cancelamento',
    action: '',
    irreversibleForFlags: [],
  },
  999: {
    message: 'Sistema/comunicação indisponível.',
    action: '',
    irreversibleForFlags: [],
  },
  A2: {
    message: 'VERIFIQUE OS DADOS DO CARTÃO',
    action: '',
    irreversibleForFlags: ['Amex'],
  },
  A3: {
    message: 'ERRO NO CARTÃO',
    action: 'NÃO TENTE NOVAMENTE',
    irreversibleForFlags: ['Amex'],
  },
  A5: {
    message: 'TRANSAÇÃO NÃO PERMITIDA',
    action: 'NÃO TENTE NOVAMENTE',
    irreversibleForFlags: ['Amex'],
  },
  A7: {
    message: 'ERRO NO CARTÃO',
    action: 'NÃO TENTE NOVAMENTE',
    irreversibleForFlags: ['Amex'],
  },
  AA: {
    message: 'Tempo Excedido',
    action: '',
    irreversibleForFlags: [],
  },
  AB: {
    message: 'FUNÇÃO INCORRETA (DÉBITO)',
    action: '',
    irreversibleForFlags: ['Elo'],
  },
  AC: {
    message:
      'Transação não permitida. Cartão de débito sendo usado com crédito.',
    action: 'Use a função débito.',
    irreversibleForFlags: ['Elo'],
  },
  AE: {
    message: 'Tente Mais Tarde',
    action: '',
    irreversibleForFlags: [],
  },
  AF: {
    message: 'Transação não permitida. Falha da operação.',
    action: '',
    irreversibleForFlags: [],
  },
  AG: {
    message: 'Transação não permitida. Falha da operação.',
    action: '',
    irreversibleForFlags: [],
  },
  AH: {
    message:
      'Transação não permitida. Cartão de crédito sendo usado com débito.',
    action: 'Use a função crédito.',
    irreversibleForFlags: ['Visa'],
  },
  AI: {
    message: 'Transação não autorizada. Autenticação não foi realizada.',
    action: '',
    irreversibleForFlags: [],
  },
  AJ: {
    message:
      'Transação não permitida. Transação de crédito ou débito em uma operação que permite apenas Private Label. ',
    action: 'Tente novamente selecionando a opção Private Label.',
    irreversibleForFlags: ['Visa', 'Elo'],
  },
  AV: {
    message: 'Transação nao autorizada. Dados Inválidos.',
    action: '',
    irreversibleForFlags: [],
  },
  BD: {
    message: 'Transação não permitida. Falha da operação.',
    action: '',
    irreversibleForFlags: [],
  },
  BL: {
    message: 'Transação não autorizada. Limite diário excedido.',
    action: '',
    irreversibleForFlags: [],
  },
  BM: {
    message: 'Transação não autorizada. Cartão Inválido',
    action: '',
    irreversibleForFlags: [],
  },
  BN: {
    message: 'Transação não autorizada. Cartão ou conta bloqueado.',
    action: '',
    irreversibleForFlags: [],
  },
  BO: {
    message: 'Transação não permitida. Falha da operação.',
    action: '',
    irreversibleForFlags: [],
  },
  BP: {
    message: 'Transação não autorizada. Conta corrente inexistente.',
    action: '',
    irreversibleForFlags: ['Master', 'Visa', 'Elo', 'Amex'],
  },
  BP176: {
    message: 'Transação não permitida.',
    action: '',
    irreversibleForFlags: [],
  },
  BV: {
    message: 'Transação não autorizada. Cartão vencido',
    action: '',
    irreversibleForFlags: ['Amex'],
  },
  CF: {
    message: 'Transação não autorizada.C79:J79 Falha na validação dos dados.',
    action: '',
    irreversibleForFlags: [],
  },
  CG: {
    message: 'Transação não autorizada. Falha na validação dos dados.',
    action: '',
    irreversibleForFlags: [],
  },
  DA: {
    message: 'Transação não autorizada. Falha na validação dos dados.',
    action: '',
    irreversibleForFlags: ['Amex'],
  },
  DF: {
    message: 'Transação não permitida. Falha no cartão ou cartão inválido.',
    action: '',
    irreversibleForFlags: [],
  },
  DM: {
    message: 'Transação não autorizada. Limite excedido/sem saldo.',
    action: '',
    irreversibleForFlags: [],
  },
  DQ: {
    message: 'Transação não autorizada. Falha na validação dos dados.',
    action: '',
    irreversibleForFlags: [],
  },
  DS: {
    message: 'Transação não permitida para o cartão',
    action: '',
    irreversibleForFlags: [],
  },
  EB: {
    message: 'Transação não autorizada. Limite diário excedido.',
    action: '',
    irreversibleForFlags: [],
  },
  EE: {
    message:
      'Transação não permitida. Valor da parcela inferior ao mínimo permitido.',
    action: '',
    irreversibleForFlags: [],
  },
  EK: {
    message: 'Transação não permitida para o cartão',
    action: '',
    irreversibleForFlags: [],
  },
  FA: {
    message: 'Transação não autorizada.',
    action: '',
    irreversibleForFlags: [],
  },
  FC: {
    message: 'Transação não autorizada. Ligue Emissor',
    action: '',
    irreversibleForFlags: [],
  },
  FD: {
    message: 'Transação negada. Reter cartão condição especial',
    action: '',
    irreversibleForFlags: ['Amex'],
  },
  FE: {
    message:
      'Transação não autorizada. Divergencia na data de transação/pagamento.',
    action: '',
    irreversibleForFlags: [],
  },
  FF: {
    message: 'Cancelamento OK',
    action: '',
    irreversibleForFlags: [],
  },
  FG: {
    message: 'Transação não autorizada. Ligue AmEx 08007285090.',
    action: '',
    irreversibleForFlags: [],
  },
  GA: {
    message: 'Aguarde Contato',
    action: '',
    irreversibleForFlags: ['Master', 'Visa', 'Elo', 'Amex'],
  },
  GD: {
    message: 'Transação não permitida.',
    action: '',
    irreversibleForFlags: ['Master', 'Visa', 'Elo', 'Amex'],
  },
  HJ: {
    message: 'Transação não permitida. Código da operação inválido.',
    action: '',
    irreversibleForFlags: [],
  },
  IA: {
    message: 'Transação não permitida. Indicador da operação inválido.',
    action: '',
    irreversibleForFlags: [],
  },
  JB: {
    message: 'Transação não permitida. Valor da operação inválido.',
    action: '',
    irreversibleForFlags: ['Amex'],
  },
  P5: {
    message: 'TROCA DE SENHA / DESBLOQUEIO',
    action: '',
    irreversibleForFlags: ['Elo'],
  },
  KA: {
    message: 'Transação não permitida. Falha na validação dos dados.',
    action: '',
    irreversibleForFlags: [],
  },
  KB: {
    message: 'Transação não permitida. Selecionado a opção incorrente.',
    action: '',
    irreversibleForFlags: [],
  },
  KE: {
    message: 'Transação não autorizada. Falha na validação dos dados.',
    action: '',
    irreversibleForFlags: [],
  },
  N7: {
    message: 'Transação não autorizada. Código de segurança inválido.',
    action: '',
    irreversibleForFlags: ['Master', 'Visa', 'Elo', 'Amex'],
  },
  R0: {
    message: 'SUSPENSÃO DE PAGAMENTO RECORRENTE PARA UM SERVIÇO',
    action: '',
    irreversibleForFlags: ['Visa'],
  },
  R1: {
    message: 'Transação não autorizada. Cartão inadimplente (Do not honor)',
    action: '',
    irreversibleForFlags: ['Visa'],
  },
  R2: {
    message: 'TRANSAÇÃO NÃO QUALIFICADA PARA VISA PIN',
    action: '',
    irreversibleForFlags: ['Visa'],
  },
  R3: {
    message: 'SUSPENSÃO DE TODAS AS ORDENS DE AUTORIZAÇÃO',
    action: '',
    irreversibleForFlags: ['Visa'],
  },
  U3: {
    message: 'Transação não permitida. Falha na validação dos dados.',
    action: '',
    irreversibleForFlags: [],
  },
  N3: {
    message: 'SAQUE NÃO DISPONÍVEL',
    action: '',
    irreversibleForFlags: ['Visa'],
  },
  N8: {
    message: 'DIFERENÇA. PRÉ AUTORIZAÇÃO',
    action: '',
    irreversibleForFlags: ['Visa', 'Elo'],
  },
  NR: {
    message: 'Transação não permitida.',
    action: 'Retentar a transação após 30 dias',
    irreversibleForFlags: ['Visa', 'Elo', 'Amex'],
  },
  RP: {
    message: 'Transação não permitida.',
    action: 'Retentar a transação após 72 horas',
    irreversibleForFlags: [],
  },
  '99A': {
    message: 'Token não encontrado',
    action: '',
    irreversibleForFlags: [],
  },
  '99B': {
    message: 'Sistema indisponível/Falha na comunicação',
    action: '',
    irreversibleForFlags: [],
  },
  '99C': {
    message: ' Sistema indisponível/Exceção no processamento',
    action: '',
    irreversibleForFlags: [],
  },
  '99Z': {
    message: 'Sistema indisponível/Retorno desconhecido',
    action: '',
    irreversibleForFlags: [],
  },
  '99TA': {
    message:
      'Timeout na requisição. O tempo para receber o retorno da requisição excedeu.',
    action: '',
    irreversibleForFlags: [],
  },
  AF01: {
    message: 'Recusado manualmente em analise antifraude',
    action: '',
    irreversibleForFlags: [],
  },
  AF02: {
    message: 'Recusado automaticamente em analise antifraude',
    action: '',
    irreversibleForFlags: [],
  },
  AF03: {
    message: 'Recusado pelo antifraude da adquirente de crédito',
    action:
      'Transação não permitida conforme análise de acusa por suspeita a fraude',
    irreversibleForFlags: [],
  },
  126: {
    message: 'A data de validade do cartão de crédito é inválida',
    action: '',
    irreversibleForFlags: [],
  },
};

export function getPaymentAttemptErrorMessage(
  LR: string
): IPaymentAttemptErrorFields | null {
  const errorFounded = paymentAttemptErrors[LR];
  if (!errorFounded)
    return {
      message: 'Não foi possível processar a transação. Tente novamente.',
      action: '',
      irreversibleForFlags: [],
    };

  return errorFounded;
}
