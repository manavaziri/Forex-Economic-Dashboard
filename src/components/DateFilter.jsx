import { useState } from "react";
import { getDateRange } from "../utils/dateUtils";

function DateFilter({ onDateChange }) {

  const initialRange = getDateRange("all");

  const [selectedOption, setSelectedOption] = useState("all");

  const [dateFrom, setDateFrom] = useState(initialRange.from);

  const [dateTo, setDateTo] = useState(initialRange.to);


  const handlePresetChange = (e) => {

    const option = e.target.value;

    setSelectedOption(option);


    if (option === "custom") {
      return;
    }


    const range = getDateRange(option);

    setDateFrom(range.from || "");

    setDateTo(range.to || "");

    onDateChange(range);
  };


  const handleFromChange = (e) => {

    const value = e.target.value;

    setDateFrom(value);

    onDateChange({
      from: value || null,
      to: dateTo || null,
    });
  };


  const handleToChange = (e) => {

    const value = e.target.value;

    setDateTo(value);

    onDateChange({
      from: dateFrom || null,
      to: value || null,
    });
  };
const [isOpen, setIsOpen] = useState(true);

  return (
  <div className="date-filter">
    <div
      className="filter-box-header"
      onClick={() => setIsOpen(!isOpen)}
    >
      <span>Date Filter</span>
      <span>{isOpen ? "▲" : "▼"}</span>
    </div>

    {isOpen && (
      <div className="filter-box-content">
        <div className="date-field">
  <label>Preset</label>

  <select
    value={selectedOption}
    onChange={handlePresetChange}
  >
    
          <option value="all">All Dates</option>
          <option value="today">Today</option>
          <option value="yesterday">Yesterday</option>
          <option value="thisWeek">This Week</option>
          <option value="lastWeek">Last Week</option>
          <option value="thisMonth">This Month</option>
          <option value="lastMonth">Last Month</option>
          <option value="custom">Custom Range</option>
         </select>
</div>

        <div className="date-field">
  <label>Date From</label>

  <input
    type="date"
    value={dateFrom || ""}
    onChange={handleFromChange}
    disabled={selectedOption !== "custom"}
  />
</div>

        <div className="date-field">
  <label>Date To</label>

  <input
    type="date"
    value={dateTo || ""}
    onChange={handleToChange}
    disabled={selectedOption !== "custom"}
  />
</div>
      </div>
    )}
  </div>
);
}

export default DateFilter;