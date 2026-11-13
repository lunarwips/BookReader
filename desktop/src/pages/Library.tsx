
import { useEffect } from "react";

import { books } from "../data/books";
import BookCard from "../components/BookCard";
import AddBookCard from "../components/AddBookCard";

function Library() {
    useEffect(() => {
        window.bookReader.getBooks()
            .then((books) => {
                console.log("Books from SQLite:", books);
            })
            .catch((error) => {
                console.error("Failed to load books:", error);
            });
    }, []);

    async function handleAddBook() {
        try {
            const filePath = await window.bookReader.selectEpub();

            if (!filePath) {
                return;
            }

            console.log("Selected EPUB:", filePath);
        } catch (error) {
            console.error("Failed to select EPUB:", error);
        }
    }

    return (
        <section className="library">
            <h1>Library</h1>

            <div className="book-grid">
                {books.map((book) => (
                    <BookCard
                        key={book.id}
                        book={book}
                    />
                ))}

                <AddBookCard onClick={handleAddBook} />
            </div>
        </section>
    );
}

export default Library;
