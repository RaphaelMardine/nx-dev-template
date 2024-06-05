'use client';
import {
  Button,
  Calendar,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@v4company/ui-components';
import { format } from 'date-fns';
import { CalendarDays, Filter } from 'lucide-react';
import React from 'react';

interface IPropsPeriodPicker {
  filterIcon?: boolean;
  field?: any;
  mode: 'default' | 'multiple' | 'range' | 'single';
  placeholder: string;
}

export const PeriodPicker = (props: IPropsPeriodPicker) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={'flex justify-between w-auto gap-2'}
        >
          <span>
            {props?.mode === 'range' ? (
              props?.field?.value?.from ? (
                props?.field?.value.to ? (
                  <>
                    {format(props?.field?.value.from, 'LLL dd, y')} -{' '}
                    {format(props?.field?.value.to, 'LLL dd, y')}
                  </>
                ) : (
                  format(props?.field?.value.from, 'LLL dd, y')
                )
              ) : (
                <span>{props?.placeholder}</span>
              )
            ) : (
              <>
                {props?.field?.value ? (
                  format(props?.field?.value, 'LLL dd, y')
                ) : (
                  <span>{props?.placeholder}</span>
                )}
              </>
            )}
          </span>
          {props?.filterIcon ? (
            <Filter
              height={16}
              width={16}
            />
          ) : (
            <CalendarDays
              height={16}
              width={16}
            />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <Calendar
          initialFocus
          mode={props?.mode}
          selected={props?.field?.value}
          onSelect={props?.field?.onChange}
        />
      </PopoverContent>
    </Popover>
  );
};
