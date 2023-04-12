import React, { Component } from "react";
import PropTypes from "prop-types";
import _ from "lodash";
const Pagination = (props) => {
  const { itemCount, pageSize, currentPage, onPageChange } = props;
  const pageCount = Math.ceil(itemCount / pageSize);
  if (pageCount === 1) return null;
  const pages = _.range(1, pageCount + 1);
  return (
    <nav>
      <ul className="pagination">
        {pages.map((p) => (
          <li
            key={p}
            className={p === currentPage ? "page-item active" : "page-item"}
          >
            <a
              style={{ cursor: "pointer" }}
              className="page-link"
              onClick={() => onPageChange(p)}
            >
              {p}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};
Pagination.propTypes = {
  itemCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
