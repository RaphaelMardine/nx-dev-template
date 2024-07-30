'use client';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Tabs,
} from '@v4company/ui-components';
import { FinanceOverview } from './components/FinanceOverview';
import { useRouter } from 'next/navigation';

export default function Finance() {
  const route = useRouter();
  return (
    <div className="px-8 pt-20 bg-center first-line:bg-center text-ellipsis">
      <div className="pb-6" />
      <div className="flex flex-col gap-8">
        <Tabs defaultValue="active">
          <Card className="col-span-3">
            <CardHeader>
              <div className="flex justify-between w-full">
              <CardTitle>Visão geral - Financeiro</CardTitle>
              <Button
              className="w-fit"
              onClick={() => route.push('https://app.portao3.com.br/user/login')}
              >
                Ir para Portão 3
              </Button>
              </div>
            </CardHeader>
            <CardContent>
              <FinanceOverview />
            </CardContent>
          </Card>
        </Tabs>
      </div>
    </div>
  );
}
