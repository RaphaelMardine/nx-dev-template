import { ReactNode } from 'react';

export function Card({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col w-full gap-4 p-4 bg-gray-100 rounded-md lg:w-1/2">
      {children}
    </div>
  );
}
