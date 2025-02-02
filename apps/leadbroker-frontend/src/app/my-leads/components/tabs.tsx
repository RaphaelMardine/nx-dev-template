import { Tabs, TabsList, TabsTrigger } from '@v4company/ui-components';
import { Dispatch, SetStateAction } from 'react';

interface TabsMyLeadsProps {
  tab: 'LEADS_PURCHASED' | 'LEADS_REFUNDED';
  setTab: Dispatch<SetStateAction<'LEADS_PURCHASED' | 'LEADS_REFUNDED'>>;
}

export function TabsMyLeads({ tab, setTab }: TabsMyLeadsProps) {
  return (
    <Tabs
      defaultValue={tab}
      className="w-full"
    >
      <TabsList>
        <TabsTrigger
          value="LEADS_PURCHASED"
          onClick={() => setTab('LEADS_PURCHASED')}
        >
          Meus leads
        </TabsTrigger>
        <TabsTrigger
          value="LEADS_REFUNDED"
          onClick={() => setTab('LEADS_REFUNDED')}
        >
          Solicitações de reembolso
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
