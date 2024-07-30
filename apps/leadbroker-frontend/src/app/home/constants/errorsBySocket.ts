export enum ERRORS_BY_SOCKET {
  BID_LOWER = 'BID_LOWER',
  INSUFFICIENT_FUNDS = 'INSUFFICIENT_FUNDS',
  GENERIC_ERROR = 'GENERIC_ERROR',
  BUY_NOW_VALUE = 'BUY_NOW_VALUE',
  AUCTION_EXPIRED = 'AUCTION_EXPIRED',
}

export const errorsBySocket = {
  BID_LOWER: {
    title: 'Lance não realizado!',
    description: 'Seu lance é menor que o último lance dado.',
    variant: 'destructive',
  },
  INSUFFICIENT_FUNDS: {
    title: 'Saldo insuficiente!',
    description: 'Seu saldo é insuficiente para realizar o lance.',
    variant: 'destructive',
  },
  GENERIC_ERROR: {
    title: 'Erro!',
    description: 'Não foi possível realizar o lance.',
    variant: 'destructive',
  },
  BUY_NOW_VALUE: {
    title: 'Compre já não realizado!',
    description:
      'Valor do compre já está incorreto ou ele já foi arrematado por outra unidade.',
    variant: 'destructive',
  },
  AUCTION_EXPIRED: {
    title: 'Tempo expirado',
    description: 'Lance não realizado, tempo já expirado.',
    variant: 'destructive',
  },
};
