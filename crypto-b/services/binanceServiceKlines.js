import fetch from "node-fetch";

export const fetchKlines = async (symbol, interval) => {
  const response = await fetch(
    `https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=${interval}&limit=1000`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch data from Binance API");
  }
  const data = await response.json();

  return data;
};
