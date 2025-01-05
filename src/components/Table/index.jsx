import React, { useState } from "react";
import Pagination from "./Pagination";

export default function TableComponent({ data = [] }) {
  const [pagination, setPagination] = useState({ page: 1, limit: 5 });

  const onPaginationChange = (changedPagination) => {
    setPagination(changedPagination);
  };

  return (
    <div>
      <div id="wrapper">
        <table>
          <thead>
            <tr>
              <th>S.No.</th>
              <th>Percentage funded</th>
              <th>Amount pledged</th>
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
                  <td>{row?.["s.no"]}</td>
                  <td>{row?.["percentage.funded"]}</td>
                  <td>{row?.["amt.pledged"]}</td>
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
