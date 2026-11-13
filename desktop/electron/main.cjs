
const { app, BrowserWindow, ipcMain, dialog } = require("electron");
const path = require("path");
const { initializeDatabase } = require("./database.cjs");

let db;
let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        show: true,
        webPreferences: {
            preload: path.join(__dirname, "preload.cjs"),
            contextIsolation: true,
            nodeIntegration: false,
        },
    });

    mainWindow.webContents.on("did-finish-load", () => {
        console.log("Renderer finished loading");
    });

    mainWindow.webContents.on("did-fail-load", (_event, code, description) => {
        console.error("Renderer failed:", code, description);
    });

    mainWindow.on("closed", () => {
        mainWindow = null;
    });

    mainWindow.loadURL("http://localhost:5173");
}

app.whenReady().then(() => {
    db = initializeDatabase(app.getPath("userData"));

    ipcMain.handle("books:get-all", () => {
        const books = db.prepare(`
            SELECT
                id,
                title,
                author,
                COALESCE(genre, '') AS genre,
                COALESCE(cover_path, '') AS cover,
                status,
                is_favorite AS isFavorite
            FROM books
            ORDER BY added_at DESC
        `).all();

        return books.map((book) => ({
            ...book,
            isFavorite: Boolean(book.isFavorite),
        }));
    });

    ipcMain.handle("books:add", (_event, bookData) => {
        if (
            !bookData ||
            typeof bookData.title !== "string" ||
            !bookData.title.trim() ||
            typeof bookData.author !== "string" ||
            !bookData.author.trim() ||
            typeof bookData.filePath !== "string" ||
            !bookData.filePath.trim()
        ) {
            throw new Error("Invalid book data");
        }

        const insertBook = db.prepare(`
            INSERT INTO books (
                title,
                author,
                genre,
                file_path,
                cover_path
            )
            VALUES (
                @title,
                @author,
                @genre,
                @filePath,
                @coverPath
            )
        `);

        const result = insertBook.run({
            title: bookData.title.trim(),
            author: bookData.author.trim(),
            genre: bookData.genre ?? null,
            filePath: bookData.filePath,
            coverPath: bookData.coverPath ?? null,
        });

        return {
            id: Number(result.lastInsertRowid),
            title: bookData.title.trim(),
            author: bookData.author.trim(),
            genre: bookData.genre ?? "",
            cover: bookData.coverPath ?? "",
            status: "unread",
            isFavorite: false,
        };
    });

    ipcMain.handle("books:select-file", async () => {
        const result = await dialog.showOpenDialog(mainWindow, {
            title: "Select an EPUB book",
            properties: ["openFile"],
            filters: [
                {
                    name: "EPUB Books",
                    extensions: ["epub"],
                },
            ],
        });

        if (result.canceled || result.filePaths.length === 0) {
            return null;
        }

        return result.filePaths[0];
    });

    createWindow();
});

app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("before-quit", () => {
    if (db && db.open) {
        db.close();
    }
});
