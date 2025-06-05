import axios, { AxiosInstance } from 'axios';

const API_URL: string =
  process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080/api/v1/';

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_URL,

  withCredentials: true,
});
