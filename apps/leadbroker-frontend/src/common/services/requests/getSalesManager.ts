import { usersApi } from '@v4company/services';

interface SalesManager {
  _id: string;
  name: string;
}

export async function getSalesManager() {
  const obj: {
    error: Record<string, unknown> | null;
    data: SalesManager[];
  } = { error: null, data: [] as SalesManager[] };

  const mandateId = [process.env.NEXT_PUBLIC_MANAGER_MANDATE_ID];
  try {
    const response = await usersApi.get(`/user`, {
      params: {
        withPagination: false,
        page: 1,
        limit: 10,
        mandatesId: JSON.stringify(mandateId),
      },
    });

    obj.data = response.data.data;

    return obj;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    obj.error = err.response?.data;
    return obj;
  }
}
