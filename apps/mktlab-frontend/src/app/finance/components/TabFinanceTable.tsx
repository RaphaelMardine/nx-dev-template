import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@v4company/ui-components';
import { Result } from '../../common/services/requests/paymentslips/getPaymentSlipsAll';
import { formatDate } from '../../common/lib/utils';
import { convertCentsToBRL } from '@v4company/utils';
import { formatStatusPaymentSlips } from '../hooks/formatStatusPaymentSlips';
import { Dispatch, SetStateAction } from 'react';

export const TabFinanceTable = ({
  InvoiceList,
  setDealSelected,
}: {
  InvoiceList: Result[] | undefined;
  setDealSelected: Dispatch<SetStateAction<string>>;
}) => {
  return (
    <Card x-chunk="dashboard-05-chunk-3">
      <CardHeader className="px-7">
        <CardTitle>Faturas</CardTitle>
        <CardDescription>Recentes faturas emitidas</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Vencimento</TableHead>
              <TableHead className="hidden sm:table-cell">Cliente</TableHead>
              <TableHead className="hidden sm:table-cell">Unidade</TableHead>
              <TableHead className="hidden md:table-cell">Total</TableHead>
              <TableHead className="text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {InvoiceList?.map((items: Result, key: number) => {
              const totalAmount = Number(items.paymentSlips.totalAmount);
              const dueDate = new Date(items.paymentSlips.dueDate);
              return (
                <TableRow
                  className="bg-accent"
                  key={key}
                  onClick={() => setDealSelected(items?.paymentSlips.dealId)}
                >
                  <TableCell>
                    <div className="font-medium">{formatDate(dueDate)}</div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <div className="hidden text-sm text-muted-foreground md:inline">
                      {items?.parties[0]?.customerName || '-'}
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <div className="hidden text-sm text-muted-foreground md:inline">
                      {items?.parties[0]?.franchiseName}
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    {convertCentsToBRL(totalAmount)}
                  </TableCell>
                  <TableCell className="hidden text-right md:table-cell">
                    {formatStatusPaymentSlips(items?.paymentSlips?.status)}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
