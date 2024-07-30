import { Skeleton } from '@v4company/ui-components';

export function NotSelected({ loading }: { loading: boolean }) {
  const loadingClass = loading ? 'animate-pulse' : 'animate-none';
  return (
    <div className="flex flex-col gap-2 p-6">
      <Skeleton
        className={`flex items-center justify-center bg-neutral-200 h-96 ${loadingClass}`}
      >
        <p className="px-4 font-semibold text-center text-neutral-400">
          Para iniciar selecione um lead ao lado
        </p>
      </Skeleton>
      <div className="flex flex-col gap-2 my-2">
        <Skeleton className={`w-1/4 h-3 bg-neutral-200 ${loadingClass}`} />
        <Skeleton className={`w-1/3 h-3 bg-neutral-200 ${loadingClass}`} />
      </div>
      <Skeleton className={`w-full h-14 bg-neutral-200 ${loadingClass}`} />
      <Skeleton className={`w-full h-7 bg-neutral-200 ${loadingClass}`} />
    </div>
  );
}
