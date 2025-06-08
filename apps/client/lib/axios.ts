import axios, { AxiosInstance } from 'axios';

const API_URL: string =
  process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080/api/v1/';

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_URL,

  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  async config => {
    if (typeof window === 'undefined') {
      const { cookies } = await import('next/headers');

      try {
        const cookieStore = await cookies();
        const jwtToken = cookieStore.get('jwt')?.value;
        if (jwtToken) {
          config.headers.Cookie = `jwt=${jwtToken}`;
        }
      } catch (error) {
        console.log('Could not access cookies in server context', error);
      }
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);
