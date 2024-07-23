import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@v4company/ui-components';
import { ListAuctions } from '.';
import { TABS } from '../constants';

export function TabsBroker() {
  return (
    <Tabs
      className="h-full"
      defaultValue="all"
    >
      <TabsList>
        <TabsTrigger value="all">Todos os leads</TabsTrigger>
        <TabsTrigger value="packs">Packs</TabsTrigger>
        <TabsTrigger value="offers">Ofertas</TabsTrigger>
      </TabsList>
      <TabsContent
        className="h-full"
        value="all"
      >
        <ListAuctions value={'all' as TABS} />
      </TabsContent>
      <TabsContent
        className="h-full"
        value="packs"
      >
        <ListAuctions value={'packs' as TABS} />
      </TabsContent>
      <TabsContent
        className="h-full"
        value="offers"
      >
        <ListAuctions value={'offers' as TABS} />
      </TabsContent>
    </Tabs>
  );
}
