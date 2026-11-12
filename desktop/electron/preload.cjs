const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("bookReader", {
    getBooks: () => ipcRenderer.invoke("books:get-all"),
});