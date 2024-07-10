import { fileApi } from '../api';

export interface FileList extends File {
  filename?: string;
  url?: string;
}

export async function sendFile(files: FileList) {
  const obj: {
    error: Record<string, unknown> | null;
    data: FileList;
  } = { error: null, data: {} as FileList };

  try {
    const formData = new FormData();
    formData.append('file', files);

    const response = await fileApi.post('/storage', formData);

    obj.data = response.data;

    return obj;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    obj.error = err.response?.data;
    return obj;
  }
}
