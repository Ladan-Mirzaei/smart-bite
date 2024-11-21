import { useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";

export function useFetch() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { getToken } = useAuth();
  const [errorMessage, setErrorMessage] = useState("");

  async function fetchData(url, method = "GET", body = null, headers = {}) {
    setErrorMessage("");

    try {
      console.log("Request URL:", url);
      console.log("Request Method:", method);
      console.log("Request Body:", body);
      console.log("Authorization Header:");

      const token = await getToken();

      setIsLoading(true);
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          ...headers,
        },
        body: body ? JSON.stringify(body) : null,
      });
      console.log("Response JSON:33333", response);

      if (response.ok) {
        const jsonData = await response.json();
        setData(jsonData);
        console.log("Response JSON:", jsonData);
        return jsonData;
      } else if (response.status === 404) {
        setErrorMessage("Not found.");
        setData([]);
      } else {
        setErrorMessage(`Unexpected error: ${response.status}`);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setErrorMessage("An internal error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }
  return { fetchData, data, isLoading, errorMessage };
}
