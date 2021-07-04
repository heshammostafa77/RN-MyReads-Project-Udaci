import React from "react";
import { Link, Route } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import "./App.css";

import BooksList from "./components/BooksList";
import SearchBooks from "./components/SearchBooks";

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    books: [],
  };

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState(() => ({
        books,
      }));
    });
  }

  onSelectHandler = (book, bookShelf) => {
    book.shelf = bookShelf;
    BooksAPI.update(book, bookShelf).then((res) => {
      if (bookShelf !== "none") {
        this.setState((prevState) => ({
          books: [...prevState.books.filter((bk) => bk.id !== book.id), book],
        }));
      } else {
        this.setState((prevState) => ({
          books: [...prevState.books.filter((bk) => bk.id !== book.id)],
        }));
      }
    });
  };

  render() {
    const currentlyReadingBooks = this.state.books.filter(
      (book) => book.shelf === "currentlyReading"
    );
    const wantToReadBooks = this.state.books.filter(
      (book) => book.shelf === "wantToRead"
    );
    const readBooks = this.state.books.filter((book) => book.shelf === "read");

    return (
      <div className="app">
        <Route
          exact
          path="/search"
          render={() => (
            <SearchBooks
              books={this.state.books}
              onSelectChange={this.onSelectHandler}
            />
          )}
        />
        <Link to="/search" className="open-search">
          <button>Add a Book</button>
        </Link>

        <Route
          exact
          path="/"
          render={() => (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <BooksList
                  books={currentlyReadingBooks}
                  title="Currently Reading"
                  onSelectChange={this.onSelectHandler}
                />
                <BooksList
                  books={wantToReadBooks}
                  title="Want to Read"
                  onSelectChange={this.onSelectHandler}
                />
                <BooksList
                  books={readBooks}
                  title="Read"
                  onSelectChange={this.onSelectHandler}
                />
              </div>
            </div>
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
