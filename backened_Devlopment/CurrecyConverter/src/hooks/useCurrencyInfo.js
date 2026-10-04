import { useEffect, useState } from "react";

function useCurrencyInfo(currency) {
  const [data, setData] = useState({});

  useEffect(() => {
    if (!currency) return;

    let isMounted = true;
    const cleanCurrency = currency.toLowerCase();
    const primaryUrl = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${cleanCurrency}.json`;
    const fallbackUrl = `https://latest.currency-api.pages.dev/v1/currencies/${cleanCurrency}.json`;

    const fetchData = async () => {
      try {
        const response = await fetch(primaryUrl);
        if (!response.ok) throw new Error("Primary fetch failed");
        const json = await response.json();
        if (isMounted && json[cleanCurrency]) {
          setData(json[cleanCurrency]);
        }
      } catch (err) {
        // Attempt fallback URL
        try {
          const fallbackRes = await fetch(fallbackUrl);
          if (!fallbackRes.ok) throw new Error("Fallback fetch failed");
          const fallbackJson = await fallbackRes.json();
          if (isMounted && fallbackJson[cleanCurrency]) {
            setData(fallbackJson[cleanCurrency]);
          }
        } catch (fallbackErr) {
          console.error("Failed to fetch currency rates:", fallbackErr);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [currency]);

  return data;
}

export default useCurrencyInfo;