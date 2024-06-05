import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from './breadcrumb';
import { Slash } from 'lucide-react';

interface iPathBreadcrumb {
  label: string;
  path: string;
}

export const NavigationBreadcrumb = ({
  bcrumbContent,
}: {
  bcrumbContent: iPathBreadcrumb[];
}) => {
  return (
    <>
      <Breadcrumb className="font-sans">
        <BreadcrumbList>
          {bcrumbContent.map((item, index) => {
            const isLastItem = index === bcrumbContent.length - 1;
            return (
              <>
                <BreadcrumbItem key={item.label}>
                  {isLastItem ? (
                    <BreadcrumbPage className="font-sans">
                      {item.label}
                    </BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink path={item.path}>
                      {item.label}
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
                {!isLastItem && (
                  <BreadcrumbSeparator>
                    <Slash />
                  </BreadcrumbSeparator>
                )}
              </>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </>
  );
};
