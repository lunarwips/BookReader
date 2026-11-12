import type { Book } from "../data/books";

declare global {
    interface Window {
        bookReader: {
            getBooks: () => Promise<Book[]>;
        };
    }
}

export {};