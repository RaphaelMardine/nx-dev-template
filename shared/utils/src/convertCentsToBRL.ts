const convertCentsToBRL = (cents: number): string => {
  const formatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  const BRL = formatter.format(cents / 100);

  return BRL;
};

const convertValueToBRL = (amount: number) => {
  const formatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  const fixedAmountNumber = +String(amount).replace(',', '.');

  return formatter.format(fixedAmountNumber);
};

export { convertCentsToBRL, convertValueToBRL };
