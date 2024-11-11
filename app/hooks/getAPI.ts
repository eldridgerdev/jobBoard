import { useState, useEffect } from "react";

export const useAPI = (
  url: string,
  options?: any,
): { data: any; isLoading: boolean; error: Error | null } => {
  const [data, setData] = useState<null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const res = await fetch(url, options);
      const jobData = await res.json();

      if (!res.ok) {
        // @TODO: Displaying the error message to the frontend is not ideal in prod.
        throw new Error(jobData.message);
      }
      setData(jobData);
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
