const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const { initializeDatabase } = require("./database.cjs");

let db;

function createWindow() {
    const window = new BrowserWindow({
        width:1200,
        height:800,
        webPreferences: {
            preload: path.join(__dirname, "preload.cjs"),
            contextIsolation: true,
            nodeIntegration: false,
        }
    });

    window.loadURL("http://localhost:5173");
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

  createWindow();
});
