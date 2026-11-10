import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
//=======================
import {
  economicData,
  economicCurrencies,
  economicCases,
  economicImpValues,
} from "./utils/processEconomicData.jsx";
//==========================
import Filter from "./components/Filter";
import DateFilter from "./components/DateFilter";
import { getDateRange } from "./utils/dateUtils";
//======================================


function App() {
 
 const [
    selectedEconomicCurrency,
    setSelectedEconomicCurrency,
  ] = useState(economicCurrencies);

  const [
    selectedEconomicCase,
    setSelectedEconomicCase,
  ] = useState(economicCases);

  const [
    selectedEconomicImp,
    setSelectedEconomicImp,
  ] = useState(economicImpValues);
//=====================
const [selectedDateRange, setSelectedDateRange] = useState(
  getDateRange("all")
);
  
  return (
    <> 
    <div>
      <Header
        mainText="Economic & Currency Dashboard"
        subText="Fundamental Analysis and Market Insights"
        symbol="📊"
      />
    </div>
    <div className="filter-panel">
      {/* Currency */}
      <Filter
        title="Currency"
        options={economicCurrencies}
        selected={selectedEconomicCurrency}
        onSelect={setSelectedEconomicCurrency}
        showAllNone={true}
      />

      {/* Category */}
      <Filter
        title="Category"
        options={economicCases}
        selected={selectedEconomicCase}
        onSelect={setSelectedEconomicCase}
        showAllNone={true}
      />

      {/* Importance */}
      <Filter
        title="Importance"
        options={economicImpValues}
        selected={selectedEconomicImp}
        onSelect={setSelectedEconomicImp}
        showAllNone={true}
      />

      {/* Date */}
      <DateFilter onDateChange={setSelectedDateRange} />
    </div>
    </>  
  );
}

export default App;