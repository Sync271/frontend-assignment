import React, { useState } from "react";
import Pagination from "./Pagination";
import ColumnSelection from "./ColumnSelection";
import { columnPrettyNameMap } from "../../constants";
import CustomCell from "./CustomCell";

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
            <tr style={{ background: "black" }}>
              {columns?.map((value) => (
                <th
                  key={value}
                  tabIndex={0}
                  style={{ zIndex: 1 }}
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
                    background: rowIndex === cellToHighlight.row ? "#555" : "",
                    // background: "grey",
                  }}
                >
                  {columns?.map((value) => (
                    <td
                      key={value}
                      tabIndex={0}
                      aria-label={`${columnPrettyNameMap[value]} - ${row?.[value]}`}
                      style={{
                        minWidth: "10rem",
                        background:
                          value === cellToHighlight.column ? "#555" : "",
                      }}
                      onMouseEnter={() =>
                        setCellToHighlight({ row: rowIndex, column: value })
                      }
                      onMouseLeave={() => {
                        setCellToHighlight({ row: "", column: "" });
                      }}
                    >
                      <CustomCell
                        columnName={value}
                        value={row?.[value]}
                        item={row}
                      />
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
