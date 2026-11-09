function Filter({
  title,
  options = [],
  selected = [],
  onSelect,
  showAllNone = false,
}) {
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