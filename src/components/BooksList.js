import React from "react";
import BookItems from "./BookItems";
import "../App.css";

class BooksList extends React.Component {
  render() {
    const { onSelectChange, title, books, currentBooks } = this.props;
    return (
      <BookItems
        onSelectChange={onSelectChange}
        title={title}
        books={books}
        currentBooks={currentBooks}
      />
    );
  }
}

export default BooksList;
