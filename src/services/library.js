const libraryProvider = require("../providers/libraryProvider");

const getLibrary = async (id) => {
  return await libraryProvider.getLibrary(id);
};

const getAllLibraries = async () => {
  return await libraryProvider.getAllLibraries();
};

const createLibrary = async (library) => {
  return await libraryProvider.createLibrary(library);
};

const updateLibrary = async (id, library) => {
  return await libraryProvider.updateLibrary(id, library);
};

const deleteLibrary = async (id) => {
  return await libraryProvider.deleteLibrary(id);
};

const addNewBook = async (libraryId, book) => {
  return await libraryProvider.addNewBook(libraryId, book);
};

module.exports = {
  getLibrary,
  getAllLibraries,
  createLibrary,
  updateLibrary,
  deleteLibrary,
  addNewBook,
};
