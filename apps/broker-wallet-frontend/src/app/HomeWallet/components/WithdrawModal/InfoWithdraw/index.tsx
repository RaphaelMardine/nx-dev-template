import { TriangleAlert } from 'lucide-react';

export const InfoWithdraw = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[35vh] gap-4 text-center">
      <TriangleAlert
        size={32}
        className="text-yellow-500"
      />
      <p className="text-2xl font-bold">Fique atento!</p>
      <p>
        Caso o valor não seja depositado na sua conta bancária entre em contato
        com o Financeiro do Headquarter.
      </p>
    </div>
  );
};
