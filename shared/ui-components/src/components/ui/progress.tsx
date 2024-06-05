'use client';
import * as React from 'react';
import * as ProgressPrimitive from '@radix-ui/react-progress';

import { cn } from '../../utils';

interface ProgressProps
  extends React.ComponentPropsWithRef<typeof ProgressPrimitive.Root> {
  steps: string[];
}

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      'relative h-2 w-full overflow-hidden rounded-full bg-primary/20',
      className
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className="flex-1 w-full h-full transition-all bg-primary"
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </ProgressPrimitive.Root>
));

Progress.displayName = ProgressPrimitive.Root.displayName;

const StepProgress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(({ className, value, ...props }, ref) => {
  const widthBase = {
    3: 'w-[33%]',
    4: 'w-[25%]',
    5: 'w-[20%]',
  };

  return (
    <>
      <div className="flex justify-between mb-2">
        {props.steps.map((step) => {
          return (
            <p
              key={step}
              className={`font-bold ${
                widthBase[props.steps.length as keyof typeof widthBase]
              }`}
            >
              {step}
            </p>
          );
        })}
      </div>
      <ProgressPrimitive.Root
        ref={ref}
        className={cn(
          'relative h-2 w-full overflow-hidden rounded-full bg-primary/20',
          className
        )}
        {...props}
      >
        <ProgressPrimitive.Indicator
          className="flex-1 w-full h-full transition-all rounded-full bg-primary"
          style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
        />
      </ProgressPrimitive.Root>
    </>
  );
});

export { Progress, StepProgress };
