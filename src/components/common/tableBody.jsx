import React, { Component } from "react";
import _ from "lodash";
class TableBody extends Component {
  rendercall = (item, col) => {
    if (col.content) return col.content(item);

    return _.get(item, col.property);
  };
  createkey = (item, col) => {
    return item._id + (col.property || col.key);
  };
  render() {
    const { data, colums } = this.props;
    return (
      <tbody>
        {data.map((item) => (
          <tr key={item._id}>
            {colums.map((col) => (
              <td key={this.createkey(item, col)}>
                {this.rendercall(item, col)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }
}

export default TableBody;
