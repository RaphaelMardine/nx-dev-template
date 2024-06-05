import axios from 'axios';

const usersApi = axios.create({
  baseURL: process.env.USERS_URL || 'https://users.api.mktlab.app',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Allow-Methods': 'POST, GET',
  },
});

export default usersApi;
