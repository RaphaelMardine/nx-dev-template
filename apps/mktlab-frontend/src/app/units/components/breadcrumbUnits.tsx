import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from '@v4company/ui-components';
import { Slash } from 'lucide-react';

export const BreadcrumbUnits = () => {
  return (
    <>
      <Breadcrumb className="font-sans">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink path="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <Slash />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbPage className="font-sans">Unidades</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </>
  );
};
