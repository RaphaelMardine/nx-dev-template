import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@v4company/ui-components';
import { Bids } from '.';

export function ManagerAuctions() {
  return (
    <div className="flex flex-col h-full px-2 py-2 rounded bg-neutral-100">
      <Tabs
        className="h-full"
        defaultValue="all"
      >
        <TabsList className="w-full">
          <TabsTrigger
            className="w-full"
            value="all"
          >
            Dar lance
          </TabsTrigger>
          <TabsTrigger
            className="w-full"
            value="packs"
          >
            Meus lances
          </TabsTrigger>
        </TabsList>
        <TabsContent
          className="overflow-y-auto h-[75%]"
          value="all"
        >
          <Bids />
        </TabsContent>
        <TabsContent
          className="h-full"
          value="packs"
        >
          oiii
        </TabsContent>
      </Tabs>
    </div>
  );
}
