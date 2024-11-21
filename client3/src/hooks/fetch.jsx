import { useState, useEffect } from "react";

export function useFetch(url, method = "GET", body = null, headers = {}) {
  console.log("url", url);
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const API_URL = import.meta.env.VITE_API_URL;

  console.log(data);
  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const response = await fetch(url, {
          method,
          headers: {
            "Content-Type": "application/json",
            ...headers,
          },
          body: body ? JSON.stringify(body) : null,
        });

        if (response.ok) {
          const result = await response.json();
          setData(result);
          console.log("data von fetch", data);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [url, method, body, headers]);
  return { data, isLoading };
}
