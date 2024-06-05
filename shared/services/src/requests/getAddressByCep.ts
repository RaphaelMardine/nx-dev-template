import { cepApi } from '../api';

export async function getAddressByCep(cep: string) {
  try {
    const response = await cepApi.get(`/${cep}`);

    return response.data;
  } catch (err: unknown | any) {
    return { error: err.response.data };
  }
}
