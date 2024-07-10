import * as ProgressPrimitive from '@radix-ui/react-progress';

import { cn } from '@v4company/ui-components/utils';
import { ComponentPropsWithRef, ElementRef, forwardRef } from 'react';

const ProgressIndicator = forwardRef<
  ElementRef<typeof ProgressPrimitive.Root>,
  ComponentPropsWithRef<typeof ProgressPrimitive.Root>
>(({ className, ...props }, ref) => {
  const value = 0;
  const steps = [
    'Lead comprado',
    'Em prospecção',
    'Reunião marcada',
    'Contrato enviado',
  ];
  const widthBase = {
    3: 'w-[33%]',
    4: 'w-[25%]',
    5: 'w-[20%]',
  };

  return (
    <div>
      <div className="flex justify-between mb-2">
        {steps?.map((step) => {
          return (
            <p
              key={step}
              className={`font-bold w-full ${
                widthBase[steps.length as keyof typeof widthBase]
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
    </div>
  );
});
ProgressIndicator.displayName = 'ProgressIndicator';

export { ProgressIndicator };
