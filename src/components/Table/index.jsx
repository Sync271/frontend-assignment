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
                <th key={value}>{columnPrettyNameMap[value]}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data
              ?.slice(
                (pagination?.page - 1) * pagination?.limit,
                pagination?.page * pagination?.limit
              )
              ?.map?.((row) => (
                <tr>
                  {columns?.map((value) => (
                    <td key={value}>{row?.[value]}</td>
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
