import React, { Component } from "react";
import Like from "./common/like";
import Table from "./common/table";
import { Link } from "react-router-dom";
import auth from "../services/authService";

class MoviesTable extends Component {
  colums = [
    {
      property: "title",
      label: "Title",
      content: (movie) => (
        <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
      ),
    },
    { property: "genre.name", label: "Genre" },
    { property: "numberInStock", label: "Stock" },
    { property: "dailyRentalRate", label: "Rate" },
    {
      key: "like",
      label: "Like",
      content: (movie) => (
        <Like
          liked={movie.like}
          onClick={() => this.props.onLike(movie)}
        ></Like>
      ),
    },
  ];
  deleteColumn = {
    key: "delete",
    label: "Delete",
    content: (movie) => (
      <button
        onClick={() => this.props.onDelete(movie)}
        className="btn btn-danger btn-sm"
      >
        DELETE
      </button>
    ),
  };
  constructor() {
    super();
    const user = auth.getCurrentUser();
    if (user && user.isAdmin) this.colums.push(this.deleteColumn);
  }
  render() {
    const { movies, sortColumn, onSort } = this.props;
    return (
      <Table
        sortColumn={sortColumn}
        onSort={onSort}
        colums={this.colums}
        data={movies}
      ></Table>
    );
  }
}

export default MoviesTable;
