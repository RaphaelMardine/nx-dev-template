'use client';
import {
  Button,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@v4company/ui-components';
import { BreadcrumbUnits } from './components/breadcrumbUnits';
import { CardsUnit } from './components/cardsUnit';
import { Download } from 'lucide-react';
import { UnitTable } from './components/unitTable';
import { ReactNode, useState } from 'react';
import { ButtonCreateUnit } from './components/buttonCreateUnit';
import SearchBar from '../common/components/SearchBar';
import { UseQueryUnitList } from '../common/services/requests/units/getListsUnit';

const Container = ({ children }: { children: ReactNode }) => (
  <div className="w-full p-5 bg-white border border-solid h-max border-color-gray-default">
    {children}
  </div>
);

const FlexBox = ({ children }: { children: ReactNode }) => (
  <div className="flex gap-10 ">{children}</div>
);

export default function Unit() {
  const [active, setActive] = useState(true);
  const [name, setName] = useState('');
  const [page] = useState(1);

  const { data } = UseQueryUnitList(page, name, active);

  const unitsActive = data?.data?.result.filter(
    (unit) => unit.status === 'ACTIVE'
  );
  const unitsInactive = data?.data?.result.filter(
    (unit) => unit.status === 'INACTIVE'
  );

  return (
    <div className="min-h-screen px-8 pt-20 bg-center first-line:bg-center text-ellipsis">
      <BreadcrumbUnits />
      <div className="flex justify-between py-8">
        <h1 className="text-4xl font-bold">Visão geral</h1>
        <ButtonCreateUnit />
      </div>
      <div className="flex flex-col gap-8">
        <Container>
          <FlexBox>
            <CardsUnit
              quantity={unitsActive?.length || 0}
              title="Franquias ativas"
            />
            <CardsUnit
              quantity={unitsInactive?.length || 0}
              title="Franquias inativadas"
            />
            <CardsUnit
              title="Novas franquias"
              quantity={unitsActive?.length || 0}
              contentBadge={`+ 100%`}
              typeBadge="success"
            />
          </FlexBox>
        </Container>
        <Container>
          <Tabs defaultValue="active">
            <div className="flex justify-between">
              <h2 className="font-bold text-2 xl">Gerenciamento de unidades</h2>
              <div className="flex">
                <Button
                  disabled
                  variant={'link'}
                  className="text-[#2E1C87] font-bold text-sm underline capitalize gap-2"
                >
                  <Download
                    width={16}
                    height={16}
                  />{' '}
                  Exportar relatório
                </Button>
                <TabsList>
                  <TabsTrigger
                    value="active"
                    onClick={() => setActive(true)}
                  >
                    Ativas
                  </TabsTrigger>
                  <TabsTrigger
                    value="inactive"
                    onClick={() => setActive(false)}
                  >
                    Inativas
                  </TabsTrigger>
                </TabsList>
              </div>
            </div>
            <div className="flex justify-between py-6">
              <SearchBar
                placeholder="Busque por unidade"
                className="pr-4 w-80 pl-9"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <TabsContent value="active">
              {data?.data && <UnitTable data={data?.data?.result} />}
            </TabsContent>
            <TabsContent value="inactive">
              {data?.data && <UnitTable data={data?.data?.result} />}
            </TabsContent>
          </Tabs>
        </Container>
      </div>
    </div>
  );
}
