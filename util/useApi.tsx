import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { API_BASE_URL, API_KEY } from "@env";

export function useFetch(url: string) {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState<any>(false);

  useEffect(() => {
    (async function () {
      try {
        setLoading(true);
        const response = await axios.get(API_BASE_URL + url, {
          withCredentials: true,
        });
        setData(response.data);
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    })();
  }, [url]);

  return { data, error, loading, setData };
}

export function useUpdateCreate(url: string, payload: any) {
  const [response, setResponse] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState<any>(false);

  const create = useCallback(async () => {
    try {
      setError(null);
      setLoading(true);
      const response = await axios.post(API_BASE_URL + url, payload, {
        headers: {
          "x-api-key": API_KEY,
          "Content-Type": "application/json",
        },
      });
      setResponse(response);
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [url, payload]);

  const update = useCallback(
    async (id: string | Number) => {
      try {
        setLoading(true);
        const response = await axios.patch(
          API_BASE_URL + url + `/${id}`,
          payload,
          {
            withCredentials: true,
          }
        );
        setResponse(response);
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    },
    [url, payload]
  );

  return { response, error, loading, create, update };
}
