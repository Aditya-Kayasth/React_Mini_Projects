import { useEffect, useState } from "react";

function useCurrencyInfo(currency) {
    const [data, setData] = useState({});

    useEffect(() => {
        fetch(`https://v6.exchangerate-api.com/v6/4533cf9ff70d7cce5d44e21e/latest/${currency}`)
            .then((res) => res.json())
            .then((res) => {
                setData(res.conversion_rates); 
            })
            .catch((err) => {
                console.error("Failed to fetch currency data:", err);
                setData({});
            });
    }, [currency]);

    return data;
}

export default useCurrencyInfo;
