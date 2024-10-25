import { useState, useEffect } from "react";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

export const useAPI = (
  host: string,
  url: string,
  options?: AxiosRequestConfig,
): { data: any; isLoading: boolean; error: Error | null } => {
  const [data, setData] = useState<null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const response: AxiosResponse = await axios(`https://${url}`, options);
      setData(response.data);
    } catch (error) {
      setError(error);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // @TODO: deal with any
  return { data, isLoading, error };
};
