import { api } from '@v4company/services';

export async function getDashboardUrl(
  dashboardId: number,
  params: Record<string, string>
) {
  const obj: {
    error: Record<string, unknown> | null;
    data: string;
  } = { error: null, data: '' };
  try {
    const response = await api.post<{ metabaseUrl: string }>('/ads/metabase', {
      dashboardId,
      params,
    });
    obj.data = response.data.metabaseUrl;

    return obj;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    obj.error = err.response?.data;
    return obj;
  }
}
