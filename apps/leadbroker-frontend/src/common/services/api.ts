import axios from 'axios';
import { parseCookies } from 'nookies';

const cookies = parseCookies(undefined);
const token = cookies['v4company.token'];

const headers = {
  Authorization: `Bearer ${token || cookies['v4company.token']}`,
};

export const leadBrokerApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_HB_LEADS_API,
  headers,
});

export const apiGateway = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_GATEWAY,
  headers,
});

export const fileApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_STORAGE_URL,
  headers,
});

export const iuguApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_IUGU_API,
  headers: { accept: 'application/json', 'content-type': 'application/json' },
});
