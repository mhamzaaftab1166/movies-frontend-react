import React, { Component } from "react";
import { deleteMovie, getMovies } from "../services/movieService";
import { getGenres } from "../services/genreService";
import MoviesTable from "./moviesTable";
import Pagination from "./common/pagination";
import _ from "lodash";
import { paginate } from "../utils/paginate";
import { Link } from "react-router-dom";
import ListGroup from "./common/listgroup";
import SearchBox from "./common/searchBox";
import { toast } from "react-toastify";
class Movies extends Component {
  state = {
    movies: [],
    genre: [],
    pageSize: 4,
    currentPage: 1,
    selectedGenre: null,
    searchQuery: "",
    sortColumn: { property: "title", order: "asc" },
  };
  componentWillUnmount() {
    console.log("unm");
  }
  async componentDidMount() {
    console.log("lol");
    const { data } = await getGenres();
    const genre = [{ name: "All Genre", _id: "" }, ...data];
    const { data: movies } = await getMovies();
    this.setState({ movies, genre });
  }
  handledelete = async (movie) => {
    const originalMovies = this.state.movies;
    let movies = originalMovies.filter((m) => m._id !== movie._id);
    this.setState({ movies });
    try {
      await deleteMovie(movie._id);
    } catch (e) {
      if (e.response && e.response.status === 404)
        toast.error("movie already deleted");
      this.setState({ movies: originalMovies });
    }
  };
  handleLike = (movie) => {
    let movies = [...this.state.movies];
    let index = movies.indexOf(movie); //only frontend
    movies[index] = { ...movie };
    movies[index].like = !movies[index].like;
    this.setState({ movies });
  };
  handlePageChane = (page) => {
    this.setState({ currentPage: page });
  };
  handleGenreSelect = (genre) => {
    this.setState({ selectedGenre: genre, currentPage: 1, searchQuery: "" });
  };
  handleSearch = (query) => {
    this.setState({ currentPage: 1, selectedGenre: null, searchQuery: query });
  };
  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  getPageData = () => {
    const {
      pageSize,
      searchQuery,
      currentPage,
      selectedGenre,
      movies: almovie,
      sortColumn,
    } = this.state;
    let filtered = almovie;
    if (searchQuery)
      filtered = almovie.filter((m) =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (selectedGenre && selectedGenre._id)
      filtered = almovie.filter((m) => m.genre._id === selectedGenre._id);

    const sorted = _.orderBy(
      filtered,
      [sortColumn.property],
      [sortColumn.order]
    );
    const movies = paginate(sorted, currentPage, pageSize);
    return { totalCount: filtered.length, data: movies };
  };
  render() {
    console.log("render lol");
    console.log(this.state);
    const { pageSize, currentPage, sortColumn, searchQuery } = this.state;
    const { user } = this.props;
    if (this.state.movies.length === 0)
      return <p>THE IS NO MOVIE IN DATABASE</p>;
    const { totalCount, data: movies } = this.getPageData();
    return (
      <div className="row">
        <div className="col-2">
          <ListGroup
            items={this.state.genre}
            selectedItem={this.state.selectedGenre}
            onItemSelect={this.handleGenreSelect}
          ></ListGroup>
        </div>
        <div className="col">
          {user && (
            <Link
              style={{ marginBottom: 15 }}
              to="/movies/new"
              className="btn btn-primary"
            >
              NEW MOVIE
            </Link>
          )}
          <p>SHOWING {totalCount} MOVIES</p>
          <SearchBox
            value={searchQuery}
            onChange={this.handleSearch}
          ></SearchBox>
          <MoviesTable
            movies={movies} //local
            onDelete={this.handledelete}
            onLike={this.handleLike}
            onSort={this.handleSort}
            sortColumn={sortColumn} //state
          ></MoviesTable>
          <Pagination
            itemCount={totalCount}
            pageSize={pageSize}
            onPageChange={this.handlePageChane}
            currentPage={currentPage}
          ></Pagination>
        </div>
      </div>
    );
  }
}

export default Movies;
