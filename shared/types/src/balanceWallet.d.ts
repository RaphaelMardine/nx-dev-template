export interface BalanceWallet {
  _id: string;
  available: number;
  bonusAmount: number;
  financialAmount: number;
  totalBonusAmount: number;
  availableBonus: Record<string, unknown>[];
  expiredBonus: Record<string, unknown>[];
}
