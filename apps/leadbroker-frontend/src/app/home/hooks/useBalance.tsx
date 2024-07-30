'use client';

import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from 'react';
import { useQuery } from '@tanstack/react-query';
import { getBalance } from '../../../common/services';
import { useAuth } from '@v4company/contexts';
import { useWebsocket } from '@v4company/hooks';

const BalanceContext = createContext(
  {} as {
    totalBalance: number;
    balance: { available: number; bonusAmount: number };
  }
);

const BalanceProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const { data } = useWebsocket();
  const [totalBalance, setTotalBalance] = useState(0);
  const { data: balance } = useQuery({
    queryKey: ['get-balance', user.unitId],
    queryFn: async () => {
      const response = await getBalance(user.unitId);
      setTotalBalance((response.available || 0) + (response.bonusAmount || 0));
      return response;
    },
    enabled: !!user.unitId,
  });

  useEffect(() => {
    if (!data) return;
    if (data.event === 'balanceChanged') {
      setTotalBalance(data.body.value + balance?.bonusAmount);
    }
  }, [balance?.bonusAmount, data]);

  return (
    <BalanceContext.Provider value={{ totalBalance, balance }}>
      {children}
    </BalanceContext.Provider>
  );
};

function useBalance() {
  return useContext(BalanceContext);
}

export { BalanceProvider, BalanceContext, useBalance };
