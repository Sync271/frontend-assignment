import React, { useState } from "react";
import Pagination from "./Pagination";
import ColumnSelection from "./ColumnSelection";
import { columnPrettyNameMap } from "../../constants";

export default function TableComponent({ data = [] }) {
  const [pagination, setPagination] = useState({ page: 1, limit: 5 });
  const [columns, setColumns] = useState([
    "s.no",
    "percentage.funded",
    "amt.pledged",
  ]);

  const [cellToHighlight, setCellToHighlight] = useState({
    row: "",
    column: "",
  });

  const onPaginationChange = (changedPagination) => {
    setPagination(changedPagination);
  };

  const onColumnsChange = (newColumns) => setColumns(newColumns);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <ColumnSelection
        defaultColumns={columns}
        columns={columns}
        onChange={onColumnsChange}
      />
      <div id="wrapper">
        <table>
          <thead>
            <tr>
              {columns?.map((value) => (
                <th
                  key={value}
                  tabIndex={0}
                  aria-label={columnPrettyNameMap[value]}
                >
                  {columnPrettyNameMap[value]}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data
              ?.slice(
                (pagination?.page - 1) * pagination?.limit,
                pagination?.page * pagination?.limit
              )
              ?.map?.((row, rowIndex) => (
                <tr
                  aria-label={`Row ${rowIndex + 1}`}
                  tabIndex={0}
                  style={{
                    background: rowIndex === cellToHighlight.row ? "grey" : "",
                    // background: "grey",
                  }}
                >
                  {columns?.map((value) => (
                    <td
                      key={value}
                      tabIndex={0}
                      aria-label={`${columnPrettyNameMap[value]} - ${row?.[value]}`}
                      style={{
                        background:
                          value === cellToHighlight.column ? "grey" : "",
                      }}
                      onMouseEnter={() =>
                        setCellToHighlight({ row: rowIndex, column: value })
                      }
                      onMouseLeave={() => {
                        setCellToHighlight({ row: "", column: "" });
                      }}
                    >
                      {row?.[value]}
                    </td>
                  ))}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <Pagination
        count={data?.length}
        onChange={onPaginationChange}
        pagination={pagination}
      />
    </div>
  );
}
