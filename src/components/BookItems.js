import React from "react";
import "../App.css";

class BooksItems extends React.Component {
  render() {
    let bookShelf = "";
    const { title, currentBooks, books } = this.props;
    return (
      <div>
        <div className="bookshelf">
          <h2 className="bookshelf-title">{title}</h2>
          <div className="bookshelf-books">
            <ol className="books-grid">
              {books.map((book) => {
                if (currentBooks) {
                  const currentBook = currentBooks.find(
                    (b) => b.id === book.id
                  );
                  bookShelf = currentBook ? currentBook.shelf : "none";
                }
                return (
                  <li key={book.id}>
                    <div className="book">
                      <div className="book-top">
                        <div
                          className="book-cover"
                          style={{
                            width: 128,
                            height: 193,
                            backgroundImage: `url(${
                              book.imageLinks.smallThumbnail
                            })`,
                          }}
                        />

                        <div className="book-shelf-changer">
                          <select
                            value={bookShelf ? bookShelf : book.shelf}
                            onChange={(e) =>
                              this.props.onSelectChange(book, e.target.value)
                            }
                          >
                            <option value="move" disabled>
                              Move to...
                            </option>
                            <option value="currentlyReading">
                              Currently Reading
                            </option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                          </select>
                        </div>
                      </div>
                      <div className="book-title">{book.title}</div>
                      <div className="book-authors">{book.authers}</div>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>
    );
  }
}

export default BooksItems;
