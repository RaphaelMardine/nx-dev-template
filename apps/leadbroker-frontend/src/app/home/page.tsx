'use server';

import { Header, TabsBroker } from './components';

export default async function HomeLeadbroker() {
  return (
    <div className="flex w-full h-full gap-4 p-3 pt-16 pb-4 overflow-hidden">
      <div className="flex flex-col w-full gap-4 p-6 overflow-y-auto rounded bg-neutral-100">
        <Header />
        <hr />
        <TabsBroker />
      </div>
      <div className="w-1/3 p-6 rounded bg-neutral-100">oiiii</div>
    </div>
  );
}
