export const foundByZipCode = async (zipCode: string) => {
  const response = await fetch(
    `https://api.brasilaberto.com/v1/zipcode/${zipCode}`
  );

  return response.json();
};
