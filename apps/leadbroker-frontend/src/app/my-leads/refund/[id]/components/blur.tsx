import Image from 'next/image';
import blurAbout from '../assets/blurAbout.png';
import blurDescription from '../assets/blurDescription.png';
import { CircleAlert } from 'lucide-react';

export function Blur() {
  return (
    <div className="flex flex-col gap-4">
      <div className="absolute bottom-0 left-0 right-0 top-2/3">
        <div className="flex justify-center">
          <p className="flex items-center justify-center gap-2 px-3 py-1 text-sm border rounded-full border-violet-700 text-violet-700 bg-violet-200 max-w-fit">
            <CircleAlert size={16} /> Você não pode mais ver informações do lead
            após solicitar reembolso
          </p>
        </div>
      </div>
      <Image
        alt="about-refund"
        src={blurAbout}
      />
      <Image
        alt="about-refund"
        src={blurDescription}
      />
    </div>
  );
}
