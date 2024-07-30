import { Badge } from '@v4company/ui-components';

interface ICardUnits {
  title: string;
  quantity: number;
  typeBadge?: 'success';
  contentBadge?: string;
}

export const CardsCustomers = ({
  title,
  quantity,
  typeBadge,
  contentBadge,
}: ICardUnits) => {
  return (
    <div className="w-full p-5 border border-solid rounded-lg h-28">
      <h1 className="text-2xl font-bold">{quantity}</h1>
      <div className="flex justify-between">
        <span>{title}</span>
        {typeBadge && <Badge variant={typeBadge}>{contentBadge}</Badge>}
      </div>
    </div>
  );
};
