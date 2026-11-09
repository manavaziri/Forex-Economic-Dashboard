import "./App.css";
import Header from "./components/Header";
//=======================
import {
  economicData,
  economicCurrencies,
  economicCases,
  economicImpValues,
} from "./utils/processEconomicData.jsx";

function App() {
  
  return (
    <div>
      <Header
        mainText="Economic & Currency Dashboard"
        subText="Fundamental Analysis and Market Insights"
        symbol="📊"
      />
    </div>
  );
}

export default App;