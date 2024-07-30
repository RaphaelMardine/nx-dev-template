import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from '@v4company/ui-components';
import { Slash } from 'lucide-react';

export const BreadcrumbDeals = ({ unitId }: { unitId: string }) => {
  return (
    <>
      <Breadcrumb className="font-sans">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink path="/finance">Financeiro</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <Slash />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbLink path={`/customers/${unitId}`}>
              Clientes
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <Slash />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbPage className="font-sans">
              Negociações
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </>
  );
};
