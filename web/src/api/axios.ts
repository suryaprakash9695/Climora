import axios from 'axios';

const api = axios.create({
  baseURL: typeof window !== 'undefined' ? '' : process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000',
  timeout: 30000,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.response.use(
  (res) => res,
  (error) => {
    const message =
      error.response?.data?.error ?? error.message ?? 'Something went wrong';
    return Promise.reject(new Error(message));
  }
);

export default api;
