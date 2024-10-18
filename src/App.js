import "./App.css";
import Header from "../src/components/Header";
import { Provider } from "react-redux";
import { store } from "../src/redux/store";
import BinanceChart from "./components/CandleChart";

function App() {
  return (
    <Provider store={store}>
      <header className="App-header">
        <Header />
      </header>
      <div>
        <BinanceChart />
      </div>
    </Provider>
  );
}

export default App;
