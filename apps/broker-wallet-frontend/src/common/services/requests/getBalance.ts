import { leadBrokerApi as api } from '../api';
import { parseCookies } from 'nookies';

export async function getBalance(unitId: string) {
  try {
    const cookies = parseCookies(undefined);

    const response = await api.get(`/wallet/balance/${unitId}?detailed=true`, {
      headers: { Authorization: `Bearer ${cookies['v4company.token']}` },
    });

    return response.data;
  } catch (err) {
    console.error(
      `Ocorreu algum problema ao carregar os auctions, atualize a página e tente novamente 😕`,
      err
    );
    return false;
  }
}
