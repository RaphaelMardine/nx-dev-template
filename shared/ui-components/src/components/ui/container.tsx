import * as React from 'react';

export interface ContainerProps {
  children: React.ReactNode;
}

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ ...props }, ref) => {
    return (
      <div
        className="flex flex-col bg-first-level min-h-screen gap-8 sm:p-8 md:p-8 lg:p-12"
        ref={ref}
        {...props}
      />
    );
  }
);
Container.displayName = 'Container';

export { Container };
