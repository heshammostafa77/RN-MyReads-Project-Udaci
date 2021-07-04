import React from "react";
import BookItems from "./BookItems";
import "../App.css";

class BooksList extends React.Component {
  render() {
    return (
      <BookItems
        onSelectChange={this.props.onSelectChange}
        title={this.props.title}
        books={this.props.books}
      />
    );
  }
}

export default BooksList;
