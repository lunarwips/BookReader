import { books } from "../data/books";
import BookCard from "../components/BookCard";
import { useEffect } from "react";

function Library() {
    useEffect(() => {
      window.bookReader.getBooks().then((books) => {
        console.log("Books from SQLite:", books);
    });
  }, []);
  
  return (
    <section className="library">
      <h1>Library</h1>

      <div className="book-grid">
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </section>
  );
}

export default Library;