import React, { createContext, useEffect, useState } from "react";

export const Coin = createContext();
const CryptoContext = ({ children }) => {
  const [currency, setCurrency] = useState("INR");
  const [symbol, setSymbol] = useState("₹");
 const[loading,setLoading]=useState(false)

 
  useEffect(() => {
    if (currency === "INR") setSymbol("₹"); 
    else if (currency === "USD") setSymbol("$");
  }, [currency]);

  return (
    <Coin.Provider value={{ currency, symbol, setCurrency,loading,setLoading }}>
      {children}
    </Coin.Provider>
  );
};

export default CryptoContext;
