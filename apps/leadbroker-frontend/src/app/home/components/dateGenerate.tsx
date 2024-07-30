import { distanceInDays, formatDate } from '@v4company/utils';

export function DateGenerate({ createdAt }: { createdAt: Date }) {
  return (
    <div className="px-2 border rounded-full text-neutral-400 border-neutral-400 w-fit">
      <p className="text-xs font-semibold">
        Gerado: {distanceInDays(createdAt) < 1 ? 'Hoje' : formatDate(createdAt)}
      </p>
    </div>
  );
}
