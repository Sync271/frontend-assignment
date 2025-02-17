import React, { useMemo } from "react";

export default function Pagination({
  pagination = { page: 1, limit: 5 },
  onChange = () => {},
  count = 0,
}) {
  const { page, limit } = pagination;
  const totalPages = Math.ceil(count / limit);

  const onPageClick = (e) => {
    const value = e.target.innerText;
    if (isNaN(value)) {
      if (value === ">" && page < totalPages) {
        onChange({ limit, page: page + 1 });
      } else if (value === "<" && page > 1) {
        onChange({ limit, page: page - 1 });
      }
    } else if (parseInt(value) > 1 || parseInt(value) < totalPages) {
      onChange({ limit, page: parseInt(value) });
    }
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      onPageClick(e);
    }
  };

  const onLimitChange = (e) => {
    onChange({ limit: e.target.value, page: 1 });
  };

  return (
    <div className="pagination-container">
      <ul style={{ display: "flex", gap: ".1rem" }}>
        <li
          key="<"
          aria-label="previous page"
          tabIndex={0}
          role="button"
          className={`pagination-item page-number ${
            page === 1 ? "disabled" : ""
          }`}
          disabled={page === 1}
          onClick={onPageClick}
          onKeyDown={onKeyDown}
        >
          {"<"}
        </li>

        {new Array(totalPages).fill(0).map((_, index) => {
          if (
            index + 1 === 1 ||
            index + 1 === totalPages ||
            index + 1 === page ||
            index + 1 === page + 1 ||
            index + 1 === page - 1 ||
            (index + 1 < 6 && page < 5) ||
            (index + 1 > totalPages - 5 && page > totalPages - 4)
          ) {
            return (
              <li
                key={index + 1}
                aria-label={`page ${index + 1}`}
                tabIndex={0}
                role="button"
                className={`pagination-item page-number ${
                  page === index + 1 ? "active" : ""
                }`}
                onClick={onPageClick}
                onKeyDown={onKeyDown}
              >
                {index + 1}
              </li>
            );
          }

          if (
            (index + 1 === totalPages - 1 && totalPages - page > 3) ||
            (index + 1 === 2 && page - 1 > 3)
          ) {
            return (
              <li
                key={index + 1}
                className={`non-button pagination-item ${
                  page === index + 1 ? "active" : ""
                }`}
              >
                ...
              </li>
            );
          }
          return null;
        })}
        <li
          key=">"
          aria-label="next page"
          role="button"
          tabIndex={0}
          className={`pagination-item page-number ${
            page === totalPages ? "disabled" : ""
          }`}
          onClick={onPageClick}
          onKeyDown={onKeyDown}
        >
          {">"}
        </li>
      </ul>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: ".5rem",
        }}
      >
        <label>Select Limit:</label>
        <select
          defaultValue={limit}
          onChange={onLimitChange}
          style={{ height: "2rem", fontSize: "1rem" }}
        >
          {[5, 10, 25, 50].map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
