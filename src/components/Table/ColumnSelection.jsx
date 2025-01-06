import React, { useState } from "react";
import { columnPrettyNameMap } from "../../constants";

function ColumnSelection({ defaultColumns = [], onChange, columns = [] }) {
  const onToggleCheckbox = (e) => {
    const value = e.target.getAttribute("data-key");

    if (columns.includes(value)) {
      const columnsSet = new Set(columns);
      columnsSet.delete(value);
      return onChange([...columnsSet]);
    } else {
      return onChange([...columns, value]);
    }
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      onToggleCheckbox(e);
    }
  };

  return (
    <div>
      <h3>Select Columns to Display:</h3>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "auto auto auto auto",
        }}
      >
        {Object.entries(columnPrettyNameMap).map(([key, value], index) => (
          <div key={key} style={{ display: "flex", alignItems: "center" }}>
            <input
              tabIndex={0}
              type="checkbox"
              role="checkbox"
              aria-checked={columns.includes(key)}
              aria-label={`column: ${value}`}
              data-key={key}
              defaultChecked={defaultColumns.includes(key)}
              onKeyDown={onKeyDown}
              onChange={onToggleCheckbox}
              checked={columns.includes(key)}
              id={`checkbox-${index}`}
            ></input>
            <label htmlFor={`checkbox-${index}`}>{value}</label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ColumnSelection;
