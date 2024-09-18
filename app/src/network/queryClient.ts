import { QueryClient } from 'react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 60 * 1000,
    },
  },
});

export default queryClient;
