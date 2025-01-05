import React, { useState } from "react";
import { columnPrettyNameMap } from "../../constants";

function ColumnSelection({ defaultColumns = [], onChange, columns = [] }) {
  const [collapsed, setCollapsed] = useState(false);

  const onToggleCollapse = () => setCollapsed((prev) => !prev);

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
      <button
        onClick={onToggleCollapse}
        tabIndex={0}
        aria-label="select columns to display"
        type="button"
      >
        Select Columns {collapsed ? "+" : "-"}
      </button>
      {!collapsed && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "auto auto auto auto",
          }}
        >
          {Object.entries(columnPrettyNameMap).map(([key, value], index) => (
            <div key={key}>
              <label>{value}</label>
              <input
                tabIndex={0}
                type="checkbox"
                aria-label={`column: ${value}`}
                data-key={key}
                defaultChecked={defaultColumns.includes(key)}
                onKeyDown={onKeyDown}
                onChange={onToggleCheckbox}
                onClick={console.log}
                checked={columns.includes(key)}
              ></input>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ColumnSelection;
