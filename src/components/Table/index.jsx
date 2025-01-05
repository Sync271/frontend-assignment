import React from "react";

export default function TableComponent({ data = [] }) {
  return (
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
          {data?.map((row) => (
            <tr>
              <td>{row?.["s.no"]}</td>
              <td>{row?.["percentage.funded"]}</td>
              <td>{row?.["amt.pledged"]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
