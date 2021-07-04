import React from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "../BooksAPI";
import BooksList from "./BooksList";
import "../App.css";

class SearchBooks extends React.Component {
  state = {
    query: "",
    results: [],
  };

  updateQuery(query) {
    this.setState({ query: query });
    if (query.length > 0) {
      BooksAPI.search(query).then((data) => {
        if (!Array.isArray(data)) {
          this.setState({ results: [] });
        }
        if (data.length > 0) {
          this.setState({ results: data });
        }
      });
    }
  }

  render() {
    const { query, results } = this.state;
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">
            {" "}
          </Link>

          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={query}
              onChange={(event) => this.updateQuery(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-resultss">
          <ol className="books-grid" />
          <BooksList
            books={query !== "" ? results : []}
            onSelectChange={this.props.onSelectChange}
            currentBooks={this.props.books}
          />
        </div>
      </div>
    );
  }
}

export default SearchBooks;
