import { fetchKlines } from "../services/binanceServiceKlines.js";

export const getKlinesController = async (req, res) => {
  try {
    const { symbol, interval } = req.query;

    const data = await fetchKlines(symbol, interval);
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
