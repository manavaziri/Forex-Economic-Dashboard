import { useState } from "react";

 
//import "./Filter.css";

function Filter({
  title,
  options = [],
  selected = [],
  onSelect,
  showAllNone = false,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = (value) => {
    if (value === "all") {
      onSelect([...options]);
      return;
    }

    if (value === "none") {
      onSelect([]);
      return;
    }

    const newSelection = selected.includes(value)
      ? selected.filter((item) => item !== value)
      : [...selected, value];

    onSelect(newSelection);
  };

  return (
    <div className="filter-group">

      <label className="filter-title">{title}</label>

      <button
        type="button"
        className="filter-dropdown"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>
          {selected.length === 0
            ? `Select ${title}`
            : `${selected.length} selected`}
        </span>

        <span>{isOpen ? "▲" : "▼"}</span>
      </button>

      {isOpen && (
        <div className="filter-menu">

          {showAllNone && (
            <div className="filter-actions">
              <button type="button" onClick={() => toggle("all")}>
                All
              </button>

              <button type="button" onClick={() => toggle("none")}>
                None
              </button>
            </div>
          )}

          {options.map((opt) => (
            <label key={opt} className="filter-option">
              <input
                type="checkbox"
                checked={selected.includes(opt)}
                onChange={() => toggle(opt)}
              />

              <span>{opt}</span>
            </label>
          ))}

        </div>
      )}

    </div>
  );
}

 

function wFilter({
  title,
  options = [],
  selected = [],
  onSelect,
  showAllNone = false,
}) {
    const [isOpen, setIsOpen] = useState(false);
  const toggle = (value) => {
    if (value === "all") {
      onSelect([...options]);
      return;
    }

    if (value === "none") {
      onSelect([]);
      return;
    }

    const isSelected = selected.includes(value);

    const newSelection = isSelected
      ? selected.filter((item) => item !== value)
      : [...selected, value];

    onSelect(newSelection);
  };

  return (
    <div className="filter-group">

      <div className="filter-title">
        {title}
      </div>

      <div className="filter-options">

        {showAllNone && (
          <div className="filter-actions">

            <button
              type="button"
              onClick={() => toggle("all")}
              className={
                options.length > 0 && selected.length === options.length && options.every((opt) => selected.includes(opt))
                  ? "active-action"
                  : ""
              }
            >
              All
            </button>

            <button
              type="button"
              onClick={() => toggle("none")}
              className={
                selected.length === 0
                  ? "active-action"
                  : ""
              }
            >
              None
            </button>

          </div>
        )}

        {options.map((opt) => (
          <label
            key={opt}
            className={`filter-option ${
              selected.includes(opt) ? "selected-filter" : ""
            }`}
          >
            <input
              type="checkbox"
              checked={selected.includes(opt)}
              onChange={() => toggle(opt)}
            />

            <span>{opt}</span>
          </label>
        ))}

      </div>
    </div>
  );
}

export default Filter;