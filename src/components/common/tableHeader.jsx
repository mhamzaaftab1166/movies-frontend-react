import React, { Component } from "react";
class TableHeader extends Component {
  raiseSort = (property) => {
    const sortColumn = { ...this.props.sortColumn };
    if (sortColumn.property === property)
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    else {
      sortColumn.property = property;
      sortColumn.order = "asc";
    }
    this.props.onSort(sortColumn);
  };
  renderSortIcon = (col) => {
    const { sortColumn } = this.props;
    if (col.property !== sortColumn.property) return null;
    if (sortColumn.order === "asc") return <i className="fa fa-sort-asc" />;
    return <i className="fa fa-sort-desc" />;
  };
  render() {
    return (
      <thead>
        <tr>
          {this.props.colums.map((col) => (
            <th
              className="click"
              key={col.property || col.key}
              onClick={() => this.raiseSort(col.property)}
            >
              {col.label} {this.renderSortIcon(col)}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
