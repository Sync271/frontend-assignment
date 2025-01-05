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

  return (
    <div>
      <button onClick={onToggleCollapse}>
        Select Columns {collapsed ? "+" : "-"}
      </button>
      {!collapsed && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "auto auto auto auto",
          }}
        >
          {Object.entries(columnPrettyNameMap).map(([key, value]) => (
            <div key={key}>
              <label>{value}</label>
              <input
                type="checkbox"
                data-key={key}
                defaultChecked={defaultColumns.includes(key)}
                onChange={onToggleCheckbox}
                // checked={columns.includes(key)}
              ></input>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ColumnSelection;
