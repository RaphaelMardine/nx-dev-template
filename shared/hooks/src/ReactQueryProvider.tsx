'use client';
import React from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '../../contexts/src';

export const ReactQueryProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
