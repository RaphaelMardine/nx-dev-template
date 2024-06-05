import { Skeleton } from '@v4company/ui-components';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@v4company/ui-components';

interface DataTableSkeletonProps {
  /**
   * The number of columns in the table.
   * @type number
   */
  columnCount: number;

  /**
   * The number of rows in the table.
   * @default 10
   * @type number | undefined
   */
  rowCount?: number;

  /**
   * The number of searchable columns in the table.
   * @default 0
   * @type number | undefined
   */
  searchableColumnCount?: number;

  /**
   * The number of filterable columns in the table.
   * @default 0
   * @type number | undefined
   */
  filterableColumnCount?: number;

  /**
   * Flag to show the table view options.
   * @default undefined
   * @type boolean | undefined
   */
  showViewOptions?: boolean;

  /**
   * The width of each cell in the table.
   * The length of the array should be equal to the columnCount.
   * Any valid CSS width value is accepted.
   * @default ["auto"]
   * @type string[] | undefined
   */
  cellWidths?: string[];

  /**
   * Flag to prevent the table from shrinking to fit the content.
   * @default false
   * @type boolean | undefined
   */
  shrinkZero?: boolean;
}

export function DataTableSkeleton({
  columnCount,
  rowCount = 10,
  searchableColumnCount = 0,
  filterableColumnCount = 0,
  showViewOptions = true,
  cellWidths = ['auto'],
  shrinkZero = false,
}: DataTableSkeletonProps) {
  return (
    <div className="w-full space-y-3 overflow-auto">
      <div className="flex items-center justify-between w-full p-1 space-x-2 overflow-auto">
        <div className="flex items-center flex-1 space-x-2">
          {searchableColumnCount > 0
            ? Array.from({ length: searchableColumnCount }).map((_, i) => (
                <Skeleton
                  key={i}
                  className="w-40 h-7 lg:w-60"
                />
              ))
            : null}
          {filterableColumnCount > 0
            ? Array.from({ length: filterableColumnCount }).map((_, i) => (
                <Skeleton
                  key={i}
                  className="h-7 w-[4.5rem] border-dashed"
                />
              ))
            : null}
        </div>
        {showViewOptions ? (
          <Skeleton className="ml-auto hidden h-7 w-[4.5rem] lg:flex" />
        ) : null}
      </div>
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            {Array.from({ length: 1 }).map((_, i) => (
              <TableRow
                key={i}
                className="hover:bg-transparent"
              >
                {Array.from({ length: columnCount }).map((_, j) => (
                  <TableHead
                    key={j}
                    style={{
                      width: cellWidths[j],
                      minWidth: shrinkZero ? cellWidths[j] : 'auto',
                    }}
                  >
                    <Skeleton className="w-full h-6" />
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {Array.from({ length: rowCount }).map((_, i) => (
              <TableRow
                key={i}
                className="hover:bg-transparent"
              >
                {Array.from({ length: columnCount }).map((_, j) => (
                  <TableCell
                    key={j}
                    style={{
                      width: cellWidths[j],
                      minWidth: shrinkZero ? cellWidths[j] : 'auto',
                    }}
                  >
                    <Skeleton className="w-full h-6" />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex flex-col-reverse items-center justify-between w-full gap-4 px-2 py-1 overflow-auto sm:flex-row sm:gap-8">
        <Skeleton className="w-40 h-8" />
        <div className="flex flex-col-reverse items-center gap-4 sm:flex-row sm:gap-6 lg:gap-8">
          <div className="flex items-center space-x-2">
            <Skeleton className="w-24 h-8" />
            <Skeleton className="h-8 w-[4.5rem]" />
          </div>
          <div className="flex items-center justify-center text-sm font-medium">
            <Skeleton className="w-20 h-8" />
          </div>
          <div className="flex items-center space-x-2">
            <Skeleton className="hidden size-8 lg:block" />
            <Skeleton className="size-8" />
            <Skeleton className="size-8" />
            <Skeleton className="hidden size-8 lg:block" />
          </div>
        </div>
      </div>
    </div>
  );
}
