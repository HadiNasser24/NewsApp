import { useState } from 'react';

interface Response {
  data: any;
  loading: boolean;
  error: boolean;
}

/**
 * @description React hook for making api calls
 * @param fn async function to be executed later on
 * @example
 * const [response, apiCall] = useApiCall(async () => {
 *    return await axois.get(url, body);
 * });
 *
 * useEffect(() => { apiCall(); }, []) // always keep the empty square brackets
 */
const useApi = (fn: any): [Response, () => Promise<any>] => {
  const [data, setData] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  const invoke = async () => {
    setLoading(true);
    try {
      const result = await fn();
      setData(result);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return [{ data, loading, error }, invoke];
};

export { useApi };
