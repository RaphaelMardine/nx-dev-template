import { api } from '../api';

export async function getPermissionsByUser() {
  try {
    const response = await api.get(`/manager-broker-permissions/find/by-user`);
    const permissions = response.data;

    return permissions;
  } catch (err: unknown | any) {
    return { error: err.response.data };
  }
}
