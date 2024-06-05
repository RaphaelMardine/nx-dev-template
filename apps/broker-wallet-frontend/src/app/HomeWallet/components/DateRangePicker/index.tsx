'use client';

import * as React from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { CalendarIcon } from '@radix-ui/react-icons';
import { addDays, format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import type { DateRange } from 'react-day-picker';

import { cn } from '@v4company/ui-components/utils';
import {
  Button,
  type ButtonProps,
  Calendar,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@v4company/ui-components';

interface DateRangePickerProps
  extends React.ComponentPropsWithoutRef<typeof PopoverContent> {
  /**
   * The selected date range.
   * @default undefined
   * @type DateRange
   * @example { from: new Date(), to: new Date() }
   */
  dateRange?: DateRange;

  date: DateRange | undefined;

  setDate: React.Dispatch<React.SetStateAction<DateRange | undefined>>;

  /**
   * The number of days to display in the date range picker.
   * @default undefined
   * @type number
   * @example 7
   */
  dayCount?: number;

  /**
   * The placeholder text of the calendar trigger button.
   * @default "Pick a date"
   * @type string | undefined
   */
  placeholder?: string;

  /**
   * The variant of the calendar trigger button.
   * @default "outline"
   * @type "default" | "outline" | "secondary" | "ghost"
   */
  triggerVariant?: Exclude<ButtonProps['variant'], 'destructive' | 'link'>;

  /**
   * The size of the calendar trigger button.
   * @default "default"
   * @type "default" | "sm" | "lg"
   */
  triggerSize?: Exclude<ButtonProps['size'], 'icon'>;

  /**
   * The class name of the calendar trigger button.
   * @default undefined
   * @type string
   */
  triggerClassName?: string;
}

export function DateRangePicker({
  dateRange,
  date,
  setDate,
  dayCount,
  placeholder = 'Selecione um período',
  triggerVariant = 'outline',
  triggerSize = 'default',
  triggerClassName,
  className,
  ...props
}: DateRangePickerProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  React.useMemo(() => {
    let fromDay: Date | undefined;
    let toDay: Date | undefined;

    if (dateRange) {
      fromDay = dateRange.from;
      toDay = dateRange.to;
    } else if (dayCount) {
      toDay = new Date();
      fromDay = addDays(toDay, -dayCount);
    }
    setDate({ from: fromDay, to: toDay });
    return [fromDay, toDay];
  }, [dateRange, dayCount, setDate]);

  // Update query string
  React.useEffect(() => {
    const newSearchParams = new URLSearchParams(searchParams);
    if (date?.from) {
      newSearchParams.set(
        'from',
        format(date.from, 'yyyy-MM-dd', {
          locale: ptBR,
        })
      );
    } else {
      newSearchParams.delete('from');
    }

    if (date?.to) {
      newSearchParams.set(
        'to',
        format(date.to, 'yyyy-MM-dd', {
          locale: ptBR,
        })
      );
    } else {
      newSearchParams.delete('to');
    }

    router.push(`${pathname}?${newSearchParams.toString()}`, {
      scroll: false,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date?.from, date?.to]);

  return (
    <div className="grid gap-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={triggerVariant}
            size={triggerSize}
            className={cn(
              'w-full justify-start truncate text-left font-normal',
              !date && 'text-muted-foreground',
              triggerClassName
            )}
          >
            <CalendarIcon className="mr-2 size-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, 'LLL dd, y', {
                    locale: ptBR,
                  })}{' '}
                  -{' '}
                  {format(date.to, 'LLL dd, y', {
                    locale: ptBR,
                  })}
                </>
              ) : (
                format(date.from, 'LLL dd, y', {
                  locale: ptBR,
                })
              )
            ) : (
              <span>{placeholder}</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className={cn('w-auto p-0', className)}
          {...props}
        >
          <Calendar
            initialFocus
            mode="range"
            locale={ptBR}
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
