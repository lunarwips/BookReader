import type { Book } from "../data/books";

declare global {
    interface Window {
        bookReader: {
            getBooks: () => Promise<Book[]>;

            addBook: (bookData: {
                title: string;
                author: string;
                genre?: string;
                filePath: string;
                coverPath?: string;
            }) => Promise<Book>;

            selectEpub: () => Promise<string | null>;
        };
    }
}

export {};