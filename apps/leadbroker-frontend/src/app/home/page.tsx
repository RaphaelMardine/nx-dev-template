'use server';

import {
  Header,
  ManagerAuctions,
  TabsBroker,
  WalletOptions,
} from './components';
import { BalanceProvider } from './hooks';

export default async function HomeLeadbroker() {
  return (
    <div className="flex w-full h-full gap-4 p-3 pt-16 pb-4 overflow-hidden">
      <div className="flex flex-col w-[65%] gap-4 p-6 overflow-y-auto rounded bg-neutral-100">
        <Header />
        <hr />
        <TabsBroker />
      </div>
      <div className="w-[35%] h-full overflow-hidden">
        <BalanceProvider>
          <WalletOptions />
          <ManagerAuctions />
        </BalanceProvider>
      </div>
    </div>
  );
}
