export const formatBarcode = (barcode: string) => {
  const parte1 = barcode.substring(0, 5);
  const parte2 = barcode.substring(5, 15);
  const parte3 = barcode.substring(15, 30);
  const parte4 = barcode.substring(30, 31);
  const parte5 = barcode.substring(31);

  const stringFormatada = `${parte1}.${parte2} ${parte3} ${parte4} ${parte5}`;

  return stringFormatada;
};
