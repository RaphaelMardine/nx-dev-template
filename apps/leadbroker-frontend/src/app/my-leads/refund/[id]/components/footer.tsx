import { Button } from '@v4company/ui-components';
import { useRouter } from 'next/navigation';

export function Footer() {
  const router = useRouter();

  return (
    <div className="flex justify-end">
      <Button
        variant="destructive"
        className="px-12 rounded-full"
        onClick={() => router.push('/my-leads')}
      >
        Voltar
      </Button>
    </div>
  );
}
