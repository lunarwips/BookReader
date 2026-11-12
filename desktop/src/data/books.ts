export interface Book {
    id: number;
    title: string;
    author: string;
    genre: string;
    cover: string;
    status: "unread" | "reading" | "completed";
    isFavorite: boolean;
}

export const books: Book[] = [
    {
        id: 1,
        title: "Dune",
        author: "Frank Herbert",
        genre: "Science Fiction",
        cover: "/covers/dune.jpg",
        status: "reading",
        isFavorite: false,
    },
    {
        id: 2,
        title: "1984",
        author: "George Orwell",
        genre: "Dystopian",
        cover: "/covers/1984.jpg",
        status: "completed",
        isFavorite: false,
    },
    {
        id: 3,
        title: "The Hobbit",
        author: "J.R.R. Tolkien",
        genre: "Fantasy",
        cover: "/covers/hobbit.jpg",
        status: "unread",
        isFavorite: true,
    }
];


