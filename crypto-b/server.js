import express from "express";
import binanceRoutes from "./routes/binanceRoutes.js";
import errorHandler from "./middlewares/errorHandler.js";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.use(express.json());
app.use("/api/binance", binanceRoutes);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
