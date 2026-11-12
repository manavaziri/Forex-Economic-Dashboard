import { useState } from "react";
import TableRow from "./TableRow";
function ShowTable({
  title,
  data,
  headers,
  fields,
  rowKey,
  rowKeyFields = [],
  onSelect,
  selectedKey,
  sortableFields = [],
  numericFields = [],
})
{  
  const [sortConfig, setSortConfig] = useState([]);

  const handleSort = (field, direction) => {
    setSortConfig((prev) => {
      if (direction === "0") {
        return prev.filter((item) => item.field !== field);
      }

      const exists = prev.some((item) => item.field === field);

      if (exists) {
        return prev.map((item) =>
          item.field === field
            ? { ...item, direction }
            : item
        );
      }

      return [...prev, { field, direction }];
    });
  };
  const importanceOrder = {
    Low: 1,
    Medium: 2,
    High: 3,
  };

  const sortedData = [...data].sort((a, b) => {
    for (const sort of sortConfig) {
      const { field, direction } = sort;

      let valueA = a[field];
      let valueB = b[field];
      if (numericFields.includes(field)) {
        valueA = Number(valueA);
        valueB = Number(valueB);
      }


      if (field === "importance") {
        valueA = importanceOrder[valueA];
        valueB = importanceOrder[valueB];
      }

      if (valueA < valueB) {
        return direction === "+" ? -1 : 1;
      }

      if (valueA > valueB) {
        return direction === "+" ? 1 : -1;
      }
    }

    return 0;
  });

  return (
    <div>
      <div className="table-title">
        <h2>{title}</h2>
        <span className="record-count">
          {data.length} records
        </span>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              {headers.map((header, index) => {
                const field = fields[index];

                const sortIndex = sortConfig.findIndex(
                  (item) => item.field === field
                );
                const sortPrioritySymbols = ["①", "②", "③", "④", "⑤"];

                return (
                  <th key={header}>
                    {header}

                    {sortIndex !== -1 && (
                      <span className="sort-priority">
                        {sortPrioritySymbols[sortIndex]}
                      </span>
                    )}

                    <button
                      className={
                        sortConfig.some(
                          (item) =>
                            item.field === fields[index] &&
                            item.direction === "+"
                        )
                          ? "active-sort"
                          : ""
                      }
                      onClick={() => handleSort(fields[index], "+")}
                    >
                      +
                    </button>

                    <button
                      className={
                        sortConfig.some(
                          (item) =>
                            item.field === fields[index] &&
                            item.direction === "-"
                        )
                          ? "active-sort"
                          : ""
                      }
                      onClick={() => handleSort(fields[index], "-")}
                    >
                      -
                    </button>

                    <button onClick={() => handleSort(fields[index], "0")}>
                      0
                    </button>

                  </th>
                );
              })}
            </tr>
          </thead>


          <tbody>
            {sortedData.map((obj) => {
              const uniqueKey = rowKeyFields.length > 0
                ? rowKeyFields.map((field) => obj[field]).join("-")
                : obj[rowKey];

              return (
                <TableRow
                  key={uniqueKey}
                  data={obj}
                  fields={fields}
                  onSelect={onSelect}
                  selected={selectedKey === uniqueKey}
                />
              );
            })}
          </tbody>

          <tfoot>
            {/* فعلاً خالی */}
          </tfoot>

        </table >
      </div>
    </div >
  );
}

export default ShowTable;
{/*selected={selectedKey === obj[rowKey]}learn*/ }