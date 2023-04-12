import React, { Component } from "react";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";
const Table = ({ sortColumn, colums, data, onSort }) => {
  return (
    <table className="table">
      <TableHeader
        colums={colums}
        sortColumn={sortColumn}
        onSort={onSort}
      ></TableHeader>
      <TableBody data={data} colums={colums}></TableBody>
    </table>
  );
};

export default Table;
