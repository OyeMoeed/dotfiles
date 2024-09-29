import { queryClient } from '@app/network';

const customInvalidateQuery = (keys: string[]) => {
  queryClient.invalidateQueries(keys);
};

export default customInvalidateQuery;
