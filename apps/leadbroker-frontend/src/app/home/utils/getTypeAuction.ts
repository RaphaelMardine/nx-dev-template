export const getTypeAuction = (
  packSequencial?: number,
  refurbished?: boolean
) => {
  if (refurbished) return 'refurbished';

  if (packSequencial) return 'pack';

  return 'unitary';
};
