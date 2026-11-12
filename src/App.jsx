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
import Sidebar from "./components/Sidebar";
//======================================
import MainContent from "./components/MainContent";


function App() {
   
//filter==================== 
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
  // --------------------------------
  // Date Filter
  // --------------------------------

  const [dateRange, setDateRange] =
    useState(
      getDateRange("all")
    );

  // --------------------------------
  // Filter Economic Data
  // --------------------------------

  const filteredEconomicData =
    economicData.filter((item) => {

      if (
        dateRange.from &&
        item.Daten < dateRange.from
      ) {
        return false;
      }

      if (
        dateRange.to &&
        item.Daten > dateRange.to
      ) {
        return false;
      }

      if (
        !selectedEconomicCurrency.includes(
          item.Currency
        )
      ) {
        return false;
      }

      if (
        !selectedEconomicCase.includes(
          item.Case
        )
      ) {
        return false;
      }

      if (
        !selectedEconomicImp.includes(
          item.Imp
        )
      ) {
        return false;
      }

      return true;
    });

//=====================
const [selectedDateRange, setSelectedDateRange] = useState(
  getDateRange("all")
);
//==sidebar==================
const [activeSection, setActiveSection] = useState("economic");

const menuItems = [
  { id: "economic", label: "Economic Data", icon: "📊" },
  { id: "comparison", label: "Comparison", icon: "🔄" },
  { id: "analysis", label: "Analysis", icon: "📈" },
  { id: "news", label: "News", icon: "📰" },
];


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
      <DateFilter onDateChange={setDateRange} />
    </div>
    <div className="dashboard-body">
      <Sidebar
        items={menuItems}
        activeItem={activeSection}
        onSelect={setActiveSection}
      />
<MainContent
  activeSection={activeSection}
  
  economicData={filteredEconomicData}
/>
      
      {/*

      <MainContent
      activeSection={activeSection}
        economicData  
   
 
      <MainContent activeSection={activeSection} />
      <main className="main-content">
        {activeSection === "economic" && <EconomicData />}
        {activeSection === "comparison" && <Comparison />}
        {activeSection === "analysis" && <Analysis />}
        {activeSection === "news" && <News />}
      </main>*/}
    </div>
    
    </>  
  );
}

export default App;