import "./App.css";
import Header from "../src/components/Header";
import { Provider } from "react-redux";
import { store } from "../src/redux/store";
import CandleChart from "./components/CandleChart";
import Cart from "../src/components/Cart";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <header className="App-header">
          <Header />
          <CandleChart />
        </header>
        <body>{/*           <Cart /> */}</body>
      </div>
    </Provider>
  );
}

export default App;
