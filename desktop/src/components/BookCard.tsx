import type { Book } from "../data/books";

type BookCardProps = {
    book: Book;
};

function BookCard({ book }: BookCardProps) {
    return (
        <article className="book-card">
            <img src={book.cover} alt={book.title} />

            <div className="book-info">
                <h3>{book.title}</h3>
                <p>{book.author}</p>
                <span>{book.genre}</span>
            </div>
        </article>
    );
}

export default BookCard;