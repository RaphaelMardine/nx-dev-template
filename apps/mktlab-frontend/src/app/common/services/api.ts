import axios from 'axios';

export const lambdaApi = axios.create({
    baseURL: process.env.NEXT_PUBLIC_LAMBDA_API,
  });
  