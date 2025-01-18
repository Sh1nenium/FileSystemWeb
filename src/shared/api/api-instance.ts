import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { BACKEND_URL_BASE } from '../constants/backend-url';

export const IS_SUCCESS_STATUS = (status: number | object): boolean => {
  if (typeof(status) === 'number') {
    return status >= 200 && status < 300
  }

  if (typeof(status) !== 'undefined') {
    return true
  }

  return false;
}

export function apiInstance(url?: string, customApiConfig?: AxiosRequestConfig): AxiosInstance {
  const apiConfig: AxiosRequestConfig = {
    baseURL: `${BACKEND_URL_BASE}${url ?? ''}`,
    timeout: 5000,
    withCredentials: false,
    headers: {
      'Ngrok-Skip-Browser-Warning': '1',
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    },
    ...customApiConfig
  };
  
  const instance = axios.create(apiConfig);

  instance.interceptors.request.use(config => {
    const token = localStorage.getItem('session');
    
    if (token) {
      const parsedToken = JSON.parse(token);
      config.headers.Authorization = `Bearer ${parsedToken.value}`;
    }
  
    return config;
  });

  return instance;
}