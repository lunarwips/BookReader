import { books } from "../data/books";
import BookCard from "../components/BookCard";

function Favorites() {
    const favoriteBooks = books.filter(
        (book) => book.isFavorite
    );

    return (
        <section className="favorites">
            <h1>Favorites</h1>

            <div className="book-gred">
                {favoriteBooks.map((book) => (
                    <BookCard key={book.id} book={book} />
                ))}
            </div>
        </section>
    );
}

export default Favorites;