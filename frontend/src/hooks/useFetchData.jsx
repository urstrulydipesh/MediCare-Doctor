import { useEffect, useState } from "react";

const useFetchData = (url) => {
  const [data, setData] = useState([]);       
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const storedToken = localStorage.getItem("token");

        const response = await fetch(url, {
          headers: {
            "Content-Type": "application/json",
            Authorization: storedToken ? `Bearer ${storedToken}` : undefined,
          },
        });

        
        if (!response.ok) {
          let message = response.statusText;

          try {
            const errJson = await response.json();
            message = errJson.message || message;
          } catch {
            console.log("No JSON response");
          }

          throw new Error(message || "Something went wrong");
        }

        const result = await response.json();
        setData(result.data || result || []);  
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
};

export default useFetchData;
