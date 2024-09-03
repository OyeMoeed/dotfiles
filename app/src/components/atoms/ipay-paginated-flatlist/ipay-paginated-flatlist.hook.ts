import { useCallback, useEffect, useState } from 'react';

interface FetchResult<T> {
  data: T[];
  hasMore: boolean;
}

const usePaginatedFetch = <T>(
  fetchData: (page: number, pageSize: number) => Promise<FetchResult<T>>,
  pageSize: number,
  externalData: T[] = [],
) => {
  const [data, setData] = useState<T[]>(externalData);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    setData(externalData);
    setHasMore(true);
  }, [externalData]);

  const loadMoreData = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const result = await fetchData(page, pageSize);
      setData((prevData) => [...prevData, ...result.data]);
      setHasMore(result.hasMore);
      setPage((prevPage) => prevPage + 1);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore, fetchData, page, pageSize]);

  const refreshData = useCallback(async () => {
    setLoading(true);
    setPage(1);
    try {
      const result = await fetchData(1, pageSize);
      setData(result.data);
      setHasMore(result.hasMore);
      setPage(2);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [fetchData, pageSize]);

  useEffect(() => {
    refreshData();
  }, []);

  return { data, loading, error, loadMoreData, refreshData, hasMore };
};

export default usePaginatedFetch;
