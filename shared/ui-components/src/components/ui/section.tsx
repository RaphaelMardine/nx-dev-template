import * as React from 'react';

export interface SectionProps {
  children: React.ReactNode;
}

const Section = React.forwardRef<HTMLDivElement, SectionProps>(
  ({ ...props }, ref) => {
    return (
      <div
        className="flex flex-col bg-second-level gap-8 px-8 py-6 shadow-m rounded-md"
        ref={ref}
        {...props}
      />
    );
  }
);
Section.displayName = 'Section';

export { Section };
