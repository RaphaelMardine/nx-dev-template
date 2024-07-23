import Image from 'next/image';
import NoAuctions from '../assets/no_auctions.png';

export function WithoutAuctions() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full gap-4">
      <Image
        src={NoAuctions}
        alt="No auctions"
      />
      <p className="font-semibold">Ainda não existem leads disponíveis</p>
    </div>
  );
}
