import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getBaseUrl } from '../utils/gateBaseUrl';

const baseQuery = fetchBaseQuery({
  baseUrl: getBaseUrl(),
  prepareHeaders: (headers, { getState }) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
  credentials: 'include', // Keep this if you still need cookies for other reasons
});

export default baseQuery;
