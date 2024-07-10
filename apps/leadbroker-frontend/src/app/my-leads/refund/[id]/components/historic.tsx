import { formatDate, formatTime } from '@v4company/utils';
import { useRefund } from '../hooks';

export function Historic() {
  const { lead } = useRefund();
  return (
    <div className="flex flex-col gap-4">
      <h5>Histórico</h5>
      <div className="flex flex-col gap-4">
        {lead?.historic
          ?.sort((a, b) => (a?.time && b?.time && a.time > b.time ? -1 : 1))
          .map((item, index) => (
            <div
              key={index}
              className="flex gap-6"
            >
              <p className="flex gap-2 font-bold">
                {item?.time ? (
                  <>
                    {formatDate(item.time)} {formatTime(item.time)}
                  </>
                ) : (
                  '-'
                )}
              </p>
              <p
                dangerouslySetInnerHTML={{
                  __html: item?.message || item?.body,
                }}
              />
            </div>
          ))}
      </div>
    </div>
  );
}
