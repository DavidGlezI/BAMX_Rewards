import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { API_BASE_URL, API_KEY } from "@env";
import * as SecureStore from "expo-secure-store";

async function getValueFor(key: string) {
  let result = await SecureStore.getItemAsync(key);
  if (result) {
    return result;
  } else {
    alert("No values stored under that key.");
  }
}

export function useFetch(url: string) {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState<any>(false);

  const fetch = useCallback(async () => {
    try {
      setLoading(true);
      const jwtToken = await getValueFor("access-token");
      const response = await axios.get(API_BASE_URL + url, {
        headers: {
          "x-api-key": API_KEY,
          "access-token": jwtToken,
          "Content-Type": "application/json",
        },
      });
      setData(response.data);
    } catch (err: any) {
      alert(err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, error, loading, setData, fetch };
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
        const jwtToken = await getValueFor("access-token");
        setLoading(true);
        const response = await axios.patch(
          API_BASE_URL + url + `/${id}`,
          payload,
          {
            headers: {
              "x-api-key": API_KEY,
              "access-token": jwtToken,
              "Content-Type": "application/json",
            },
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
