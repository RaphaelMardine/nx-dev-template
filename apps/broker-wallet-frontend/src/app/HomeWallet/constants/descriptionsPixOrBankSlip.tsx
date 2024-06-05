import { Barcode, QrCode } from 'lucide-react';

export const descriptions = {
  pix: {
    title: 'Depositar com PIX',
    tax: 'Será cobrada uma taxa de R$ 3,00 por transação',
    type: 'PIX',
    labelButton: 'Gerar Código PIX QR',
    icon: <QrCode size={16} />,
  },
  bank_slip: {
    title: 'Depositar com Boleto',
    tax: 'Será cobrada uma taxa de R$ 2,00 por boleto',
    type: 'Boleto bancário',
    labelButton: 'Gerar Boleto',
    icon: <Barcode size={16} />,
  },
};
