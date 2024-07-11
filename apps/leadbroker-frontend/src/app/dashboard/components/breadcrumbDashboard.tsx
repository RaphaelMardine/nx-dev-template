import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@v4company/ui-components';
import { Slash } from 'lucide-react';

export function BreadcrumbDashboard() {
  return (
    <Breadcrumb className="pt-8 font-sans">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink path="/">Lead Broker</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <Slash />
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbPage className="font-sans">Dashboard</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
