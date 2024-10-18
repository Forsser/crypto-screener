import WebSocket from "ws";

const BINANCE_WS_URL = "wss://stream.binance.com:443/ws";
const RECONNECT_INTERVAL = 5000;
const MAX_RECONNECT_ATTEMPTS = 5;

export const setupBinanceWebSocket = (wss) => {
  wss.on("connection", (ws, req) => {
    console.log("New WebSocket connection established");

    const { symbol, interval } = parseQueryString(req.url);

    if (!symbol || !interval) {
      ws.close(1008, "Invalid symbol or interval");
      return;
    }

    let binanceWs = null;
    let isClientConnected = true;
    let reconnectAttempts = 0;

    const connectToBinance = () => {
      if (reconnectAttempts >= MAX_RECONNECT_ATTEMPTS) {
        console.log(
          "Max reconnection attempts reached. Stopping reconnection."
        );
        return;
      }

      binanceWs = new WebSocket(BINANCE_WS_URL);

      binanceWs.on("open", () => {
        console.log("Connected to Binance WebSocket");
        reconnectAttempts = 0;

        const subscribeMessage = JSON.stringify({
          method: "SUBSCRIBE",
          params: [`${symbol.toLowerCase()}@kline_${interval}`],
          id: 1,
        });
        binanceWs.send(subscribeMessage);
      });

      binanceWs.on("message", (data) => {
        if (isClientConnected) {
          try {
            const parsedData = JSON.parse(data);
            if (parsedData.e === "kline") {
              ws.send(JSON.stringify(parsedData));
            }
          } catch (error) {
            console.error("Error parsing Binance data:", error);
          }
        }
      });

      binanceWs.on("error", (error) => {
        console.error("Binance WebSocket error:", error);
      });

      binanceWs.on("close", (code, reason) => {
        console.log(`Disconnected from Binance WebSocket: ${code} - ${reason}`);
        if (isClientConnected) {
          reconnectAttempts++;
          console.log(
            `Attempting to reconnect (${reconnectAttempts}/${MAX_RECONNECT_ATTEMPTS})...`
          );
          setTimeout(connectToBinance, RECONNECT_INTERVAL);
        }
      });
    };

    connectToBinance();

    ws.on("close", () => {
      console.log("Client WebSocket connection closed");
      isClientConnected = false;
      if (binanceWs) {
        binanceWs.close();
      }
    });
  });
};

function parseQueryString(url) {
  const queryString = url.split("?")[1];
  if (!queryString) return {};

  return queryString.split("&").reduce((params, param) => {
    const [key, value] = param.split("=");
    params[key] = value;
    return params;
  }, {});
}
