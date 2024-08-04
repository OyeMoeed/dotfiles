import { useCallback, useEffect, useState } from 'react';

interface FetchDataResult<T> {
  data: T[];
  hasMore: boolean;
}

const usePaginatedFetch = <T>(
  fetchData: (page: number, pageSize: number) => Promise<FetchDataResult<T>>,
  pageSize = 10,
  externalData?: T[],
) => {
  const [data, setData] = useState<T[]>(externalData || []);
  const [currentPage, setCurrentPage] = useState<number>(1); // Renamed variable
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const loadData = async (page: number, isRefresh = false) => {
    setLoading(true);
    setError(null);

    try {
      const result = await fetchData(page, pageSize);
      setData((prevData) => (isRefresh ? result.data : [...prevData, ...result.data]));
      setHasMore(result.hasMore);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!externalData) {
      loadData(currentPage); // Use the renamed variable
    }
  }, [currentPage, externalData]);

  useEffect(() => {
    if (externalData) {
      setData(externalData);
    }
  }, [externalData]);

  const loadMoreData = useCallback(() => {
    if (!loading && hasMore) {
      setCurrentPage((prevPage) => prevPage + 1); // Use the renamed variable
    }
  }, [loading, hasMore]);

  const refreshData = useCallback(() => {
    setCurrentPage(1); // Use the renamed variable
    loadData(1, true);
  }, []);

  return { data, loading, error, loadMoreData, refreshData, hasMore };
};

export default usePaginatedFetch;
