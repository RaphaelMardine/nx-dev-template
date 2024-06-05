import axios from 'axios';
import { parseCookies } from 'nookies';

const cookies = parseCookies(undefined);
const token = cookies['v4company.token'];

const headers = {
  Authorization: `Bearer ${token || cookies['v4company.token']}`,
};

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_KUBERNETS_API,
  headers,
});

export const usersApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_USERS_API,
  headers,
});

export const cepApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_CEP_API,
});
