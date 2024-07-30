import {
  Badge,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@v4company/ui-components';
import { convertCentsToBRL } from '@v4company/utils';
import {
  AggregatedFranchiseList,
  ResultFranchiseList,
} from '../../common/services/requests/franchises/getFranchiseList';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';
import { Ellipsis } from 'lucide-react';

export const TabUnitsTable = ({
  franchiseList,
}: {
  franchiseList: ResultFranchiseList | undefined;
}) => {
  const router = useRouter();

  return (
    <Card x-chunk="dashboard-05-chunk-3">
      <CardHeader className="px-7">
        <CardTitle>Unidades</CardTitle>
        <CardDescription>
          Selecione a unidade que deseja e acesse os clientes da mesma para
          acompanhar suas negociações
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Unidade</TableHead>
              <TableHead className="hidden sm:table-cell">Fee</TableHead>
              <TableHead className="hidden sm:table-cell">
                Início da franquia
              </TableHead>
              <TableHead className="hidden md:table-cell">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {franchiseList?.result.map(
              (items: AggregatedFranchiseList, key: number) => {
                return (
                  <TableRow
                    className="bg-accent"
                    key={key}
                    onClick={() => router.push(`/customers/${items.id}`)}
                  >
                    <TableCell>
                      <div className="font-medium">
                        {items?.company?.legalName}
                      </div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <div className="hidden text-sm text-muted-foreground md:inline">
                        {convertCentsToBRL(items?.franchiseFee)}
                      </div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <div className="hidden text-sm text-muted-foreground md:inline">
                        {format(items?.startDate, 'dd/MM/yyyy')}
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {items?.status === 'ACTIVE' ? (
                        <Badge variant={'success'}>Ativo</Badge>
                      ) : (
                        <Badge variant={'destructive'}>Desativada</Badge>
                      )}{' '}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger>
                          <Ellipsis />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuLabel>Ações</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() =>
                              router.push(`/customers/${items?.id}`)
                            }
                          >
                            Visualizar clientes
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              }
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
