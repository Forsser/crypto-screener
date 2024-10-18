import express from "express";
import http from "http";
import { WebSocketServer } from "ws";
import binanceRoutes from "./routes/binanceRoutes.js";
import errorHandler from "./middlewares/errorHandler.js";
import cors from "cors";
import { setupBinanceWebSocket } from "./services/binance.service.js";

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server, path: "/api/binance/klines/ws" });

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use("/api/binance", binanceRoutes);
app.use(errorHandler);

// Setup WebSocket
setupBinanceWebSocket(wss);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
