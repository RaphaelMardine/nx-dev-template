import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '../../utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-primary text-primary-foreground hover:bg-primary/80',
        secondary:
          'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
        destructive:
          'border-transparent bg-[#FAE3DB] border border-solid border-[#EEAA91] text-[#87381C]',
        outline: 'text-foreground',
        success:
          'border border-solid border-[#B4EE91] text-color-gray-strong bg-[#E7FADB] text-[#316313]',
        warning:
          'border border-solid border-[#F4D88A] text-color-gray-strong bg-[#FAF2DB] text-[#634C13]',
        info: 'border border-solid border-[#A598E6] text-color-gray-strong bg-[#E2DDF8] text-[#3D25B6]',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
