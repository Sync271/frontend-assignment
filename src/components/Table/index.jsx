import React, { useEffect, useState } from "react";
import Pagination from "./Pagination";
import ColumnSelection from "./ColumnSelection";
import { columnPrettyNameMap } from "../../constants";
import CustomCell from "./CustomCell";

const SORT_DIRECTIONS = ["none", "ascending", "descending"];

export default function TableComponent({ data = [] }) {
  const [pagination, setPagination] = useState({ page: 1, limit: 5 });
  const [columns, setColumns] = useState([
    "s.no",
    "percentage.funded",
    "amt.pledged",
  ]);
  const [sortedData, setSortedData] = useState(null);
  const [sortDirection, setSortDirection] = useState({
    columnName: "",
    direction: 0,
  });

  const onSort = (columnName) => {
    const direction =
      sortDirection?.columnName === columnName
        ? (sortDirection?.direction + 1) % SORT_DIRECTIONS.length
        : 1;

    const sortFn = (a, b) => {
      if (
        ["s.no", "amt.pledged", "num.backers", "percentage.funded"].includes(
          columnName
        )
      ) {
        return parseInt(a?.[columnName]) - parseInt(b?.[columnName]);
      } else if (
        [
          "blurb",
          "by",
          "country",
          "currency",
          "location",
          "state",
          "title",
          "type",
          "url",
        ].includes(columnName)
      ) {
        return a?.[columnName]?.localeCompare(b?.[columnName]);
      } else {
        return new Date(a?.[columnName]) - new Date(b?.[columnName]);
      }
    };

    if (SORT_DIRECTIONS[direction] === "ascending") {
      setSortedData([...data].sort((a, b) => sortFn(a, b)));
    } else if (SORT_DIRECTIONS[direction] === "descending") {
      setSortedData([...data].sort((a, b) => sortFn(b, a)));
    } else {
      setSortedData(data);
    }

    setSortDirection({ columnName, direction });
  };

  const [cellToHighlight, setCellToHighlight] = useState({
    row: "",
    column: "",
  });

  const onPaginationChange = (changedPagination) => {
    setPagination(changedPagination);
  };

  const onColumnsChange = (newColumns) => setColumns(newColumns);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <ColumnSelection
        defaultColumns={columns}
        columns={columns}
        onChange={onColumnsChange}
      />
      <div className="divider"></div>
      <div id="wrapper">
        <table>
          <thead>
            <tr style={{ background: "black" }} role="row">
              {columns?.map((value) => (
                <th
                  role="columnheader"
                  scope="col"
                  aria-sort={
                    value === sortDirection.columnName
                      ? SORT_DIRECTIONS[sortDirection.direction]
                      : "none"
                  }
                  key={value}
                  style={{ zIndex: 1 }}
                  aria-label={columnPrettyNameMap[value]}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    {columnPrettyNameMap[value]}
                    <button
                      onClick={() => onSort(value)}
                      type="button"
                      aria-label={`${value} sort`}
                      tabIndex={0}
                      className={`sort-button ${
                        value === sortDirection.columnName &&
                        sortDirection.direction !== 0
                          ? "sort-active"
                          : ""
                      }`}
                    >
                      {value !== sortDirection.columnName ||
                      sortDirection.direction === 0 ? (
                        "="
                      ) : sortDirection.direction === 1 ? (
                        <div
                          style={{
                            position: "absolute",
                            top: "25%",
                            right: 0,
                            left: 0,
                          }}
                        >
                          ^
                        </div>
                      ) : (
                        <div
                          style={{
                            transform: "rotate(180deg)",
                            position: "absolute",
                            top: 0,
                            right: 0,
                            left: 0,
                            bottom: "25%",
                          }}
                        >
                          ^
                        </div>
                      )}
                    </button>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {(sortedData || data)
              ?.slice(
                (pagination?.page - 1) * pagination?.limit,
                pagination?.page * pagination?.limit
              )
              ?.map?.((row, rowIndex) => (
                <tr
                  aria-label={`Row ${rowIndex + 1}`}
                  style={{
                    background: rowIndex === cellToHighlight.row ? "#555" : "",
                  }}
                >
                  {columns?.map((value) => (
                    <td
                      role="cell"
                      key={value}
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
