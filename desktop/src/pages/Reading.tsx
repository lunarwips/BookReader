import { books } from "../data/books";
import BookCard from "../components/BookCard";

function Reading() {
    const readingBooks = books.filter(
        (book) => book.status === "reading"
    );

    return (
        <section className="reading">
            <h1>Reading now</h1>

            <div className="book-grid">
                {readingBooks.map((book) => (
                    <BookCard key={book.id} book={book} />
                ))}
            </div>
        </section>
    );
}

export default Reading;