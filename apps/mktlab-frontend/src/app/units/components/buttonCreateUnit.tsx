'use client';
import { Button } from '@v4company/ui-components';
import { useRouter } from 'next/navigation';

export const ButtonCreateUnit = () => {
  const router = useRouter();
  return (
    <Button
      className="font-bold rounded-xl"
      onClick={() => router.push('/units/newUnit')}
    >
      Nova Unidade
    </Button>
  );
};
