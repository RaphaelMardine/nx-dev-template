'use client';

import { isRedirectError } from 'next/dist/client/components/redirect';
import { useToast } from '@v4company/ui-components';

import { z } from 'zod';

export function getErrorMessage(err: unknown) {
  const unknownError = 'Ocorreu algo de errado. Tente novamente mais tarde';

  if (err instanceof z.ZodError) {
    const errors = err.issues.map((issue) => {
      return issue.message;
    });
    return errors.join('\n');
  } else if (err instanceof Error) {
    return err.message;
  } else if (isRedirectError(err)) {
    throw err;
  } else {
    return unknownError;
  }
}

export function ShowErrorToast(err: unknown) {
  const { toast } = useToast();
  const errorMessage = getErrorMessage(err);
  return () =>
    toast({
      title: 'Ocorreu um erro.',
      description: errorMessage,
    });
}
