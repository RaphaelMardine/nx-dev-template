import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from '@v4company/ui-components';
import { Slash } from 'lucide-react';

export const BreadcrumbCustomers = () => {
  return (
    <Breadcrumb className="font-sans">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink path='/finance'>Financeiro</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <Slash />
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbPage className="font-sans">Clientes</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};
