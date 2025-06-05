import { cookies } from 'next/headers';
import { ApiSessionResponse, Session } from './types';

export async function auth(): Promise<Session | null> {
  try {
    const cookieStore = cookies();

    const token = (await cookieStore).get('jwt')?.value;
    if (!token) {
      return null;
    }
    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_API_BASE_URL || 'localhost:8080/api/v1/'
      }auth/verify`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        cache: 'no-store',
      }
    );
    if (!response.ok) return null;

    const data: ApiSessionResponse = await response.json();
    const { user } = data.data;

    return {
      user,
      token,
    };
  } catch (error) {
    console.error('Auth verification failed:', error);
    return null;
  }
}
