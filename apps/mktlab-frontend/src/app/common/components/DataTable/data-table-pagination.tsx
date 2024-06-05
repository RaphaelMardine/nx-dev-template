import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from '@radix-ui/react-icons';
import { type Table } from '@tanstack/react-table';

import { Button } from '@v4company/ui-components';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@v4company/ui-components';

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
  pageSizeOptions?: number[];
}

export function DataTablePagination<TData>({
  table,
  pageSizeOptions = [10, 20, 30, 40, 50],
}: DataTablePaginationProps<TData>) {
  return (
    <div className="flex flex-col-reverse items-center justify-between w-full gap-4 px-2 py-1 overflow-auto sm:flex-row sm:gap-8">
      <div className="flex flex-col-reverse items-center justify-between w-full gap-4 sm:flex-row sm:gap-6 lg:gap-8">
        <div className="flex items-center w-full space-x-2">
          <p className="text-sm font-medium whitespace-nowrap">
            Itens por página{' '}
          </p>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value));
            }}
          >
            <SelectTrigger className="h-8 w-[4.5rem]">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {pageSizeOptions.map((pageSize) => (
                <SelectItem
                  key={pageSize}
                  value={`${pageSize}`}
                >
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="">1 - 10 de 20 itens</p>
        </div>
        <div className="flex items-center justify-center w-full gap-6 text-sm font-medium">
          <Button
            aria-label="Vá para a primeira pagina"
            variant="outline"
            className="p-0 size-8 lg:flex"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <DoubleArrowLeftIcon
              className="size-4"
              aria-hidden="true"
            />
          </Button>
          <Button
            aria-label="Vá para a pagian anterior"
            variant="outline"
            size="icon"
            className="size-8"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeftIcon
              className="size-4"
              aria-hidden="true"
            />
          </Button>
          <div className="flex items-center justify-center text-sm font-medium">
            Página {table.getState().pagination.pageIndex + 1} de{' '}
            {table.getPageCount()}
          </div>
          <Button
            aria-label="Go to next page"
            variant="outline"
            size="icon"
            className="size-8"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRightIcon
              className="size-4"
              aria-hidden="true"
            />
          </Button>
          <Button
            aria-label="Go to last page"
            variant="outline"
            size="icon"
            className="size-8 lg:flex"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <DoubleArrowRightIcon
              className="size-4"
              aria-hidden="true"
            />
          </Button>
        </div>
      </div>
    </div>
  );
}
