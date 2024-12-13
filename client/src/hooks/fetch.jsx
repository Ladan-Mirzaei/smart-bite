import { useState } from "react";
import { AuthContext } from "../context/AuthContext.jsx";
import { useContext } from "react";

export function useFetch() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { user } = useContext(AuthContext);

  async function fetchData(url, method = "GET", body = null, headers = {}) {
    setErrorMessage("");

    try {
      const fetchHeaders = { "Content-Type": "application/json", ...headers };

      if (user) {
        const token = await user.getIdToken();
        fetchHeaders.Authorization = `Bearer ${token}`;
      }

      setIsLoading(true);
      const response = await fetch(url, {
        method,
        headers: fetchHeaders,
        body: body ? JSON.stringify(body) : null,
      });

      if (response.ok) {
        const jsonData = await response.json();
        setData(jsonData);
        return jsonData;
      } else if (response.status === 404) {
        setErrorMessage("Not found.");
        setData([]);
      } else {
        setErrorMessage(`Unexpected error: ${response.status}`);
      }
    } catch (error) {
      console.log("Error fetching data:", error);
      setErrorMessage("An internal error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return { fetchData, data, isLoading, errorMessage };
}
