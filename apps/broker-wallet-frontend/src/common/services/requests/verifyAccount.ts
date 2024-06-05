import { leadBrokerApi } from '../api';

interface VerifyAccount {
  verified: boolean;
}

export async function verifyAccount(): Promise<VerifyAccount> {
  try {
    const response = await leadBrokerApi.get(`/wallet/verify`);
    const isVerify: VerifyAccount = response.data;

    return isVerify;
  } catch (err) {
    console.error(
      `Ocorreu algum problema ao verificar sua conta, atualize a página e tente novamente 😕`,
      err
    );
    return { verified: false };
  }
}
