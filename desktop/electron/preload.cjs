
const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("bookReader", {
    getBooks: () => ipcRenderer.invoke("books:get-all"),
    addBook: (bookData) =>
        ipcRenderer.invoke("books:add", bookData),
    selectEpub: () =>
        ipcRenderer.invoke("books:select-file"),
});
